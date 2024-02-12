import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const INIT_BALANCE = 200;
const mockedAccount = getBankAccount(INIT_BALANCE);

const WITHDRAW_ERROR = new InsufficientFundsError(INIT_BALANCE).message;
const SYNC_ERROR = new SynchronizationFailedError().message;
const TRANSFER_ERROR = new TransferFailedError().message;

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(getBankAccount(INIT_BALANCE)).toMatchObject({
      _balance: INIT_BALANCE,
    });
    expect(getBankAccount(400)).toMatchObject({ _balance: 400 });
    expect(getBankAccount(600)).toMatchObject({ _balance: 600 });
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(INIT_BALANCE);
    expect(() => bankAccount.withdraw(INIT_BALANCE + 1)).toThrowError(
      WITHDRAW_ERROR,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount1 = getBankAccount(INIT_BALANCE);
    const bankAccount2 = getBankAccount(INIT_BALANCE);

    expect(() =>
      bankAccount1.transfer(INIT_BALANCE + 1, bankAccount2),
    ).toThrowError(WITHDRAW_ERROR);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(INIT_BALANCE);

    expect(() =>
      bankAccount.transfer(INIT_BALANCE + 1, bankAccount),
    ).toThrowError(TRANSFER_ERROR);
  });

  test('should deposit money', () => {
    const deposit = 200;
    const bankAccount = getBankAccount(INIT_BALANCE);
    let expectedBalance = INIT_BALANCE + deposit;

    bankAccount.deposit(deposit);
    expect(bankAccount.getBalance()).toEqual(expectedBalance);

    expectedBalance = INIT_BALANCE + deposit + deposit;
    bankAccount.deposit(deposit);
    expect(bankAccount.getBalance()).toEqual(expectedBalance);

    expectedBalance = INIT_BALANCE + deposit + deposit + deposit;
    bankAccount.deposit(deposit);
    expect(bankAccount.getBalance()).toEqual(expectedBalance);
  });

  test('should withdraw money', () => {
    const initialBalance = 1000;
    const withdraw = 200;
    let expectedBalance;

    const bankAccount = getBankAccount(initialBalance);
    expectedBalance = initialBalance - withdraw;

    bankAccount.withdraw(withdraw);
    expect(bankAccount.getBalance()).toEqual(expectedBalance);

    expectedBalance = initialBalance - withdraw - withdraw;
    bankAccount.withdraw(withdraw);
    expect(bankAccount.getBalance()).toEqual(expectedBalance);

    expectedBalance = initialBalance - withdraw - withdraw - withdraw;
    bankAccount.withdraw(withdraw);
    expect(bankAccount.getBalance()).toEqual(expectedBalance);
  });

  test('should transfer money', () => {
    const bankAccount1 = getBankAccount(INIT_BALANCE);
    const bankAccount2 = getBankAccount(INIT_BALANCE);

    bankAccount1.transfer(bankAccount1.getBalance(), bankAccount2);
    expect(bankAccount1.getBalance()).toEqual(0);
    expect(bankAccount2.getBalance()).toEqual(INIT_BALANCE + INIT_BALANCE);

    bankAccount2.transfer(0, bankAccount1);
    expect(bankAccount1.getBalance()).toEqual(0);
    expect(bankAccount2.getBalance()).toEqual(INIT_BALANCE + INIT_BALANCE);

    bankAccount2.transfer(-100, bankAccount1);
    expect(bankAccount1.getBalance()).toEqual(-100);
    expect(bankAccount2.getBalance()).toEqual(
      INIT_BALANCE + INIT_BALANCE + 100,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(mockedAccount, 'fetchBalance')
      .mockReturnValue(Promise.resolve(20));

    const balance = await mockedAccount.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(mockedAccount, 'fetchBalance')
      .mockReturnValue(Promise.resolve(20));

    await mockedAccount.synchronizeBalance();
    expect(mockedAccount.getBalance()).not.toEqual(INIT_BALANCE);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(mockedAccount, 'fetchBalance')
      .mockReturnValue(Promise.resolve(null));

    await expect(() => mockedAccount.synchronizeBalance()).rejects.toThrow(
      SYNC_ERROR,
    );
  });
});
