const LevelService = {};

LevelService.findOne = (id) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: id,
                levelName: "Some level " + id
            });
        }, 1000)
    });
};

export default LevelService;