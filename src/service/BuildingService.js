const BuildingService = {};

const buildingMock = [
    {
        id: 1,
        title: "Some building"
    },
    {
        id: 2,
        title: "Other building"
    }
];

BuildingService.findAll = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(buildingMock);
        }, 1000);
    });
};

BuildingService.findPage = (pageIndex) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                items: buildingMock,
                totalPages: 1
            });
        }, 1000)
    });
};

BuildingService.findOne = (id) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(buildingMock.find(building => {
                return building.id === id
            }))
        }, 1000);
    });
};

BuildingService.createBuilding = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({

            });
        }, 1000);
    });
};

BuildingService.findFirstLevel = (building) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: 5,
                levelName: "Some level"
            })
        }, 1000);
    });
};

export default BuildingService;