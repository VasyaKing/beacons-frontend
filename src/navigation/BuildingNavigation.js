const BuildingNavigation = {};

BuildingNavigation.toLevel = (building, level) => {
    return new Promise(resolve => {
        resolve("/buildings/" + building.id + "/levels/" + level.id + "/places");
    });
};

BuildingNavigation.toLayer = (building, level, layer) => {
    return new Promise(resolve => {
        resolve("/buildings/" + building.id + "/levels/" + level.id + "/" + layer);
    });
};

BuildingNavigation.toBuilding = (building) => {
    return new Promise(resolve => {
        resolve("/buildings/" + building.id);
    });
};

BuildingNavigation.toNew = () => {
    return new Promise(resolve => {
        resolve("/buildings/new");
    });
};

export default BuildingNavigation;