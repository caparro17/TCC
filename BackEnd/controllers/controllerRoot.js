const controllerRoot = {

    raiz: async (req, res) => {
        res.status(200).json({ msg: "A API is running!!!" })
    },
};

module.exports = controllerRoot;