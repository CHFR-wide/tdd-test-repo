const { BANK_ERRS } = require("./bankErrors");

module.exports = class FunnyBank {
    accounts = [];

    deposit(accountIndex, amount) {
        this.accounts[accountIndex].balance += amount;
    }

    debit(accountIndex, amount) {
        const account = this.accounts[accountIndex];

        if (account.balance < amount) {
            throw new Error(BANK_ERRS.notEnoughFunds);
        }

        this.accounts[accountIndex].balance -= amount;
    }

    createAccount(account) {
        this.accounts.push(account);
    }

    getAccountIdx(name) {
        const accountIdx = this.accounts.findIndex(a => a.name === name);

        if (accountIdx === -1) throw new Error(BANK_ERRS.accountDoesNotExist);
        return accountIdx;
    }

    getAccount(name) {
        return this.accounts[this.getAccountIdx(name)];
    }

    transfer(senderName, recipientName, amount) {
        let senderIdx, recipientIdx;

        try {
            senderIdx = this.getAccountIdx(senderName);
        }
        catch(e) {
            throw new Error(BANK_ERRS.senderDoesNotExist)
        }

        try {
            recipientIdx = this.getAccountIdx(recipientName);
        }
        catch(e) {
            throw new Error(BANK_ERRS.recipientDoesNotExist);
        }

        this.debit(senderIdx, amount);
        this.deposit(recipientIdx, amount);
    }
}