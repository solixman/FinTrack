
module.exports = {



        createToken() {
            try {
                const rand = () => Math.random().toString(36).substr(2);
                const token = rand() + rand() + rand() + rand();
                return token;

            }catch (error) {
                console.log(error);
            }
        }}