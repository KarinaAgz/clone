sap.ui.define([
    "sap/ui/core/UIComponent",
    "logaligroup/project1/model/models",
    "sap/ui/model/json/JSONModel",
], 
 /**
 * 
 * @param {typeof sap.ui.core.UIComponent} UIComponent 
 * @param {typeof report.ricefw.model.models} models 
 * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
 * @returns 
 */
(UIComponent, models) => {
    "use strict";

    return UIComponent.extend("logaligroup.project1.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            // set json model for Building MP Excel
            this.setModel(models.buildMpModel(), "mpModel");

        }
    });
});