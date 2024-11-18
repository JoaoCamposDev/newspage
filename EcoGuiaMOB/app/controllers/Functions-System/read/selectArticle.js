const connection = require('../../../data/connection'); // conexão com o banco de dados

exports.selectArticle = async (req, res) => {
    const { id } = req.params;

    // Executa a conexão com o banco de dados
    const executeConnection = await connection.getConnection();

    try {
        const query  = "SELECT * FROM ViewAllArticle WHERE pk_IDarticle = (?);";
        const values = [id];

        const [results] = await executeConnection.query(query, values);
        results; 

        return res.status(200).json({msg: "Artigo encontrado: ", article: results});
    } catch (error) {
        // Caso ocorra um erro durante a execução, retorna um erro 500
        console.error("Algo deu errado ao buscar artigo, tente novamente: ", error);
        return res.status(500).json({ msg: "Algo deu errado na conexão com o servidor, tente novamente." });
    } finally {
        // Fecha a conexão com o banco de dados, se foi estabelecida
        if (executeConnection) {
            await executeConnection.end();
        }
    }
};