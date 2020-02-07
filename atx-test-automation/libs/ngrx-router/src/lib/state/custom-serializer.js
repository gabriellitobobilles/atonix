var CustomRouterStateSerializer = /** @class */ (function () {
    function CustomRouterStateSerializer() {
    }
    CustomRouterStateSerializer.prototype.serialize = function (routerState) {
        var route = routerState.root;
        while (route.firstChild) {
            route = route.firstChild;
        }
        var url = routerState.url;
        var queryParams = routerState.root.queryParams;
        var params = route.params;
        return { url: url, params: params, queryParams: queryParams };
    };
    return CustomRouterStateSerializer;
}());
export { CustomRouterStateSerializer };
//# sourceMappingURL=custom-serializer.js.map