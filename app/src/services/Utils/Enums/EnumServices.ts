class EnumServices {
    convertStringFromEnum(type: any, prop: any) {
        return JSON.parse(JSON.stringify(type))[prop];
    }
}

export default new EnumServices();