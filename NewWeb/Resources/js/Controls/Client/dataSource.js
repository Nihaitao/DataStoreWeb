function CreateSetting(ColumnName) {
    return {
        search: true,
        selectedIndex: 0,
        options: [],
        fields: { root: 'Data', key: 'ID', value: 'Description' },
        remote: { url: '/service/public/HDictionary/GetHDictionaryList', data: { Valid: 1, ColumnName: ColumnName } }
    }
}