const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

// Creamos una constante para hacer las transferencias con un post
const transferAmount = async (req, res) => {
  try {
    //Traemos los datos que necesitamos del body
    const { senderUserId, accountNumber, amount } = req.body;

    // Creamos una constante para el usuario que reciva la transferencia tomamos el status y el accountNumber
    const userReceive = await User.findOne({
      where: {
        status: true,
        accountNumber: accountNumber,
      },
    });

    // Creamos una constante para recivir solo el id del usuario
    const reciveId = userReceive.id;

    // Creamos una constante para el usuario que realiza la transferencia tomamos el status y el id
    const makeTransfer = await User.findOne({
      where: {
        status: true,
        id: senderUserId,
      },
    });

    // Si el usuario que hace la transferencia tiene menor monto al que quiere mandar salta un error
    if (makeTransfer.amount < amount) {
      return res.status(404).json({
        status: 'error',
        message: 'The amount is greater than what you have',
      });
    }

    // Si el que recive es el mismo del que manda salta un error
    if (reciveId === makeTransfer.id) {
      return res.status(404).json({
        status: 'error',
        message: 'The id cannot be the same as yours',
      });
    }

    // Creamos una contstante que reste el monto del que realiza la transaccion
    const lessTrans = makeTransfer.amount - amount;

    // Creamos una constante que sume el monto del que recive la transaccion
    const sumTrans = userReceive.amount++ + amount;

    // Esperamos a que haya informacion y luego actualizamos ambas partes de la transaccion
    await makeTransfer.update({
      amount: lessTrans,
    });

    await userReceive.update({
      amount: sumTrans,
    });

    // Creamos una constante para que el usuario haga una transaccion
    const completedTrans = await Transfer.create({
      amount,
      senderUserId,
      reciveId,
    });

    // Le enviamos al cliente que todo fue bien
    res.status(201).json({
      status: 'success',
      message: 'The transaction has been completed',
      completedTrans,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

module.exports = {
  transferAmount,
};
