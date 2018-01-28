const BeaconsService = {};

const MARKERS_MOCK = [
    {
        id: 1,
        lat: -34,
        lng: 150.5
    },
    {
        id: 2,
        lat: -33.5,
        lng: 150.5
    },
    {
        id: 3,
        lat: -34,
        lng: 151
    },
    {
        id: 4,
        lat: -33.5,
        lng: 151
    }
];

BeaconsService.findAll = (building, level) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(MARKERS_MOCK);
        }, 500)
    });
};

export default BeaconsService;