const express = require('express');
const router = express.Router();

const totallyRealAccounts = {
    checking: 100,
    savings: 500
};

const transfer = ({ account, source, destination, amount }) => {
    console.log( `acclount=${account}: source=${source} : dest=${destination} :  amt=${Number(amount)}`);
    console.log(account.checking);
    console.log(account.savings);
    if (account[source] > amount) {
        account[source] -= amount;
        account[destination] += amount;

        return { success: true };
    } else {
        return { success: false, error: "insufficient funds" };
    }
};

router.post('/', (req, resp) => {

    const { state } = req.body;
    const bodychanges = req.body;
    console.log("Initiating transfer...");

    if (state === "get_balance") {

        // ...
    } else if (state === "tansfer_fund") {
        console.log("Initiating transfer...");

        const transferSlots = [
            "_AMOUNT_FROM_",
            "_AMOUNT_TO_",
            "_FUND_AMT_"
        ];
        const [source, destination, amount] = transferSlots.map(
            slot => bodychanges.slots[slot].values[0].tokens
        );
        const transferData = { source, destination, amount, value:'transfer' };

        bodychanges.slots["_TRANSFER_"] = {};
        Object.assign(bodychanges.slots["_TRANSFER_"], {
            values: [{ ...transferData, resolved: 1 }]
        });

        const invalidTypes = [source, destination].filter(
            account => !totallyRealAccounts.hasOwnProperty(account)
        );
        if (invalidTypes.length > 0) {
            Object.assign(bodychanges.slots["_TRANSFER_"].values[0], {
                success: false,
                error: `${invalidTypes}: invalid account type(s)`
            });
        } else {
            const { success, error } = transfer({
                account: totallyRealAccounts,
                ...transferData
            });

            if (success) {
                Object.assign(bodychanges.slots["_TRANSFER_"].values[0], { success });
                bodychanges.state = "get_balance";
            } else {
                Object.assign(bodychanges.slots["_TRANSFER_"].values[0], { error });
            }
        }
    }

    resp.send(bodychanges);
})

module.exports=router;