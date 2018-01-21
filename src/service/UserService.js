const UserService = {};

const usersMock = [
    {
        id: 1,
        login: "Some login"
    }
];

UserService.findPage = (pageIndex) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                items: usersMock,
                totalPages: 1
            });
        }, 1000)
    });
};

UserService.findOne = (id) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(usersMock.find(user => {
                return user.id === id;
            }))
        }, 1000);
    });
};

UserService.createUser = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({

            });
        }, 1000)
    });
};

export default UserService;