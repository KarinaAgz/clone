sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], 

/**
 * 
 * @param {typeof sap.ui.core.mvc.Controller} Controller 
 * @param {typeof.sap.ui.model.json.JSONModel}JSONModel
 * @param { typeof sap.ui.model.Filter}Filter
 * @param {typeof sap.ui.model.FilterOperator}FilterOperator
 * 
 */



(Controller,JSONModel) => {
    "use strict";

    var _tabs=["VIRTUAL","MP","PT"];
    /** ordenamiento en cabecera de tablas , par filtrar por cabecera y filtrar proveedores por sociedad
     */

    return Controller.extend("logali.group.project1.controller.MainView", {
        onInit() {

            let _requestModel=new JSONModel({
                "fecha":"",
                "dateFrom":"",
                "dateTo":"",
                "invoices":[],
                "material":[], //mateiral -parnr
                "po":[], //purshase Order _ordend e compra -ebeln
                "cliente": "",
                "parnr": "",//numero de parte
                "lifnr":"",//proveedor
                "buckrs":"",
                "visible_input_invoices":true,
                "visible_input_matnr_ev": true,
                "visible_input_matnr_pt":false,
                "visible_input_po":true,
                "visible_input_parnr":true,
                "visible_input_lifnr":false,
                "visible_input_numParte_mp":false,
                "visible_input_cliente":true,
                "visible_input_bukrs_ev":true,
                "visible_input_bukrs_mp":false,
                "visible_input_bujrs_pt":false,
                "tableEV":true,
                "tablePT": false,
                "tableMP":false
        });
        this.getView().setModel(_requestModel,"requestModel");

        var _mpLayoutModel=new sap.ui.model.json.JSONModel();
        var _ptLayoutModel=new sap.ui.model.json.JSONModel();
        var _virtualLayoutModel=new sap.ui.model.json.JSONModel();
        var _facturasModel=new sap.ui.model.json.JSONModel();

        _mpLayoutModel.loadData("./model/MP_Layout.json",false);
        _ptLayoutModel.loadData("./model/PT_Layout.json",false);
        _virtualLayoutModel.loadData("./model/Virtual_Layout.json",false);
        _facturasModel.loadData("./model/Facturas.json", false);

        this.getView().setModel(_mpLayoutModel,"mpColumsModel");
        this.getView().setModel(_ptLayoutModel,"ptColumnsModel");
        this.getView().setModel(_virtualLayoutModel, "veColumnsModel");
        this.getView().setModel(_facturasModel,"facturasModel");


        },

        onVHParnrRequest:function(oEvent){
            let sInputValue_Parnr=oEvent.getSource().getValue();
            this._parnrInputID=oEvent.getSource().getId();
            if(!this._OVHParnrDialog){
                this._OVHParnrDialog=sap.ui.xmlfragment(
                    "productos.view.fragments.ParnrSelectionDialog",
                );
                this.getView().addDependent(this._OVHParnrDialog);
            }
            //Implement filter functionality
            this._OVHParnrDialog.getBinding("items").filter([new Filter(
                "parne",FilterOperator.Contains,sInputValue_Parnr
            )]);
            this._OVHParnrDialog.open(sInputValue_Parnr);
        },
        onVHSearchParnr:function(oEvent){
            let sValue=oEvent.getParameter("value");

            let _parnr=new Filter("Parnr",FilterOperator.contains,sValue);

            let _parnrName=new Filter("parnrDescription",FilterOperator.contains,sValue);

            var _filters=new Filter({filters:[_parnr,_parnrName],and: false});
            oEvent.getSource().getBinding("items").filter([_filters]);
        },

        onVHCloseParnr:function(oEvent){
            var oSelectedIem=oEvent.getParameter("selectedItem");
            if(oSelectedIem){var _parnr=this.getView().byId(this._parnrInputId);
                _parnr.setValue(oSelectedIem.getTitle());
            }
            oEvent.getSource().getBinding("items").filter([]);
        },
        onVHLifnrRequest: function(oEvent){
            let sInputValue_lifnr=oEvent.getSource().getValue();
            this._lifnrInputId=oEvent.getSource().getId();
            if(!this._oVHlifnrDialog){
                this._oVHlifnrDialog=sap.ui.xmlfragment("productos.view.fragments.LifnrSelectionDialog",this);
                this.getView().addDependent(this._oVHlifnrDialog);
            }
            //Implement filter functionality
            this._oVHlifnrDialog.getBinding("items").filter([new Filter("Lifnr",FilterOperator.Contains,sInputValue_lifnr)]);
            this._oVHlifnrDialog.open(sInputValue_lifnr);
        },
        
        onVHSeachLifnr:function(oEvent){
            let sValue=oEvent.getParameter("value");
            let _lifnr=new Filter("LifnrName", FilterOperator.Contains,sValue);
            let _lifnrName=new Filter( "LifnrName", FilterOperator.Contains,sValue);
            var _filters=new Filter({filters:[_lifnr,_lifnrName],and:false});

            oEvent.getSource().getBinding("items").filter([_filters]);
        },
        onVHCloseLifnr:function(oEvent){
            var oSelectedIem=oEvent.getParameter("selectedItem");
            if(oSelectedIem){
                var _lifnr=this.getView().byId(this._lifnrInputId);
                _lifnr.setValue(oSelectedIem.getTitle());
            }
            oEvent.getSource().getBinding("items").filter([])
            
        },
        onVHBukrs_EV_Request:function(oEvent){
            let sInputValue_Bukrs_EV=oEvent.getSource().getValue();
            this._bukrs_EV_InputId=oEvent.getSource().getId();
            if(!this._oVHBukrs_EV_Dialog){
                this._OVHBukrs_EV_Dialog=sap.ui.xmlfragment("productos.vies.fragments.Bukrs_EV_SelectionDialog",
                    this
                );
                this.getView().addDependent(this._oVHBukrs_EV_Dialog);
            }
            //Implement filter functionality
            this._oVHBukrs_EV_Dialog.getBinding("items").filter([new Filter("bukrs",FilterOperator.Contains,sInputValue_Bukrs_EV)]);
            this._oVHBukrs_EV_Dialog.open(sInputValue_Bukrs_EV);
                
        },
        onVHSearchBukrs_EV: function(oEvent){
            let sValue=oEvent.getParameter("value");

            let _parnr=new Filter("bukrs", FilterOperator.Contains,sValue);

            var _filters=new Filter({ filters:[_parnr,_parnrName], and :false});
            oEvent.getSource().getBinding("items").filter([_filters]);
        },

        onVHCLoseBukrs:function(oEvent){
            var oSelectedItem=oEvent.getParameter("selectedItem");
            if(oSelectedItem){
                var _bukrs_ev=this.getView().byId(this._bukrs_EV_InputId);
                _bukrs_ev.setValue(oSelectedItem.getTitle());
            }
            oEvent.getSource().getBinding("items").filter([]);
        },

        onVHBukrs_MP_Request:function(oEvent){
            let sInputValue_Bukrs_MP=oEvent.getSource().getValue();
            this._bukrs_MP_InputId=oEvent.getSource().getId();
            if(!this._oVHBukrs_MP_Dialog){
                this._oVHBukrs_MP_Dialog=sap.ui.xmlfragment("proyecti.view.fragments.Bukrs_MP_SelectionDialog",this);
                this.getView().addDependent(this._oVHBukrs_MP_Dialog);
            }
            //implement filter funtionality
            this._oVHBukrs_MP_Dialog.getBinding("items").filter([new Filter("bukrs",FilterOperator.Contains,sInputValue_Bukrs_MP)]);
            this._oVHBukrs_MP_Dialog.open(sInputValue_Bukrs_MP);
        },
        onVHSearchBukrs_MP:function(oEvent){
            let sValue=oEvent.getParameter("value");
            let _parnr=new Filter("bukrs",FilterOperator.Contains,sValue);
            let _parnrName=new Filter("butxt",FilterOperator.Contains,sValue);
            var _filters=new Filter({filters:[_parnr,_parnrName],and:false});

            oEvent.getSource().getBinding("items").filter([_filters]);
        },

        onVHCloseBukrs_MP:function(oEvent){ var oSelectedItem=oEvent.getParameter("selectedItem");
            if(oSelectedItem){
                var _bukrs_mp=this.getView().byId(this._bukrs_MP_InputId);
                _bukrs_mp.setValue(oSelectedItem.getTitle());
            }
            oEvent.getSource().getBinding("items").filter([]);
        },
        onVHBukrs_PT_Request: function(oEvent){
            let sInputValue_Bukrs_PT=oEvent.getSource().getValue();
            this._bukrs_MP_InputId=oEvent.getSource().getId();
            if(!this._oVHBukrs_PT_Dialog){
                this._oVHBukrs_PT_Dialog=sap.ui.xmlfragment("productos.view.fragments.Bukrs_PT_SelectionDialog",this);
                this.getView().addDependent(this._oVHBukrs_PT_Dialog);
            }
            //implement filter functionality
            this._oVHBukrs_PT_Dialog.getBinding("items").filter([new Filter("bukrs", FilterOperator.Contains,sInputValue_Bukrs_PT)]);
            this._oVHBukrs_PT_dialog.open(sInputValue_Bukrs_PT);
        },

        onVHSearchBukrs_PT: function (oEvent) {
            let sValue = oEvent.getParameter("value");

            let _parnr = new Filter(
                "bukrs", FilterOperator.Contains, sValue
            );
            let _parnrName = new Filter(
                "butxt", FilterOperator.Contains, sValue
            );

            var _filters = new Filter({
                filters: [_parnr, _parnrName], and: false
            });
            oEvent.getSource().getBinding("items").filter([_filters]);


        },

        onVHCloseBukrs_PT: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                var _bukrs_pt = this.getView().byId(this._bukrs_PT_InputId);
                _bukrs_pt.setValue(oSelectedItem.getTitle());
            }
            oEvent.getSource().getBinding("items").filter([]);
        },

       
        _selectLayout:function(oEvent){
            let _layout=oEvent.getSource().getSelectedKey() //Extrae la clave seleccionada del evento (oEvent) y la guarda en _layout
            console.log(_layout);

            if(_tabs.filter(function(e){return e=== _layout}).length>0){ //_tabs parece ser un array que contiene los valores permitidos para _layout.
                                                                        /*Si _layout está en _tabs, sigue con la ejecución.
                                                                        Evalúa el valor de _layout y actualiza la vista:
                                                                        Dependiendo del valor de _layout, cambia la visibilidad de elementos y selecciona una tabla específica.**/
                console.log(true);
                if(_layout==="VIRTUAL"  ){         //Activa la tabla tableEV y desactiva las otras (tablePT y tableMP).

                    this.getView().getModel("requestModel").setProperty("/tableEV",true);
                    this.getView().getModel("requestModel").setProperty("/tablePT",false);
                    this.getView().getModel("requestModel").setProperty("/tableMP",false);

                    //show valid value help
                    this.getView().getModel("requestModel").setProperty("/visible_input_po",true);
                    this.getView().getModel("requestModel").setProperty("/visible_input_invoices",true);
                    this.getView().getModel("requestModel").setProperty("/visible_input_matnr_ev",true);
                    this.getView().getModel("requestModel").setProperty("/visible_input_bukrs_ev",true);
                    this.getView().getModel("requestModel").setProperty("/visible_input_matnr_pt",false);
                    this.getView().getModel("requestModel").setProperty("/visible_input_parnr",true);
                    this.getView().getModel("requestModel").setProperty("/visible_input_lifnr",false);
                    this.getView().getModel("requestModel").setProperty("/visible_input_cliente",true);
                    this.getView().getModel("requestModel").setProperty("/visible_input_bukrs_mp",false);
                    this.getView().getModel("requestModel").setProperty("/visible_input_bukrs_pt",false);
                    this.getView().getModel("requestModel").setProperty("/visible_input_numParte_mp",false);

                
                }else if(_layout==="MP"){
                    this._loadRemoteOdaataServices(_tabs[1]);
                    //selected table
                    this.getView().getModel("requestModel").setProperty("/tableMP", true);
                        this.getView().getModel("requestModel").setProperty("/tablePT", false);
                        this.getView().getModel("requestModel").setProperty("/tableEV", false);

                        //valid value help
                        this.getView().getModel("requestModel").setProperty("/visible_input_lifnr",true);
                        this.getView().getModel("requestModel").setProperty("/visible_input_numParte_mp",true);
                        this.getView().getModel("requestModel").setProperty("/visible_input_bukrs_mp",true);
                        this.getView().getModel("requestModel").setProperty("/visible_input_input_po",false);
                        this.getView().getModel("requestModel").setProperty("/visible_input_invoices",false);
                        this.getView().getModel("requestModel").setProperty("/visible_input_matnr_ev",false);
                        this.getView().getModel("requestModel").setProperty("/visible_input_matnr_pt",false);
                        this.getView().getModel("requestModel").setProperty("/visible_input_parnr",false);
                        this.getView().getModel("requestModel").setProperty("/visible_input_cliente",false);
                        this.getView().getModel("requestModel").setProperty("/visible_input_bukrs_ev",false);
                        this.getView().getModel("requestModel").setProperty("/visible_input_bukrs_pt",false);

                }else if(_layout ==="PT"){
                    this._loadRemoteOdaataServices(_tabs[2]);

                    this.getView().getModel("requestModel").setProperty("/tablePT",true);
                    this.getView().getModel("requestModel").setProperty("/tableMP",false);
                    this.getView().getModel("requestModel").setProperty("/tableEV",false);

                    //show Valid value Help
                    this.getView().getModel("requestModel").setProperty("/visible_input_matnr_pt",true);
                    this.getView().getModel("requestModel").setProperty("/visible_input_bukrs_pt",true);
                    this.getView().getModel("requestModel").setProperty("/visible_input_matnr_ev",false);

                    this.getView().getModel("requestModel").setProperty("/visible_input_lifnr",false);
                    this.getView().getModel("requestModel").setProperty("/visible_input_po",false);
                    this.getView().getModel("requestModel").setProperty("/visible_input_invoices",false);

                    this.getView().getModel("requestModel").setProperty("/visible_input_parnr",false);
                    this.getView().getModel("requestModel").setProperty("/visible_input_cliente",false);
                    this.getView().getModel("requestModel").setProperty("/visible_input_bukrs_ev",false);
                    this.getView().getModel("requestModel").setProperty("/visible_input_bukrs_mp",false);
                    this.getView().getModel("requestModel").setProperty("/visible_input_numParte_mp",false);

                }
            }
        },
        matrSelectionFinish: function(oEvent) {
            this.getView().getModel("requestModel").setProperty("/matr", "");
        
            let selectedItems = oEvent.getParameter("selectedItems");
            let _matnrSelection = selectedItems.map(item => ({ //cambie el for por map
                "Matnr": item.getKey(),
                "Text": item.getText()
            }));
        
            this.getView().getModel("requestModel").setProperty("/matnr", _matnrSelection);
            console.log("fin matnr", _matnrSelection);
        },
        //facturas
        invoicesSelectionFinish: function(oEvent) {
            this.getView().getModel("requestModel").setProperty("/invoices", "");
        
            let selectedItems = oEvent.getParameter("selectedItems");
            let _invoiceSelection = selectedItems.map(item => ({
                "invoice": item.getKey(),
                "invoiceName": item.getText()
            }));
        
            this.getView().getModel("requestModel").setProperty("/invoices", _invoiceSelection);
            console.log("fin matnr", _invoiceSelection);
        },

        exportExcel:function(_layoutId){ // recibe un parámetro _layoutId (el ID del layout de la tabla a exportar).
            let _validation_flag=this.validations();
            let _selectedLayout;//almacenará el tipo de layout seleccionado.

            if(_validation_flag){ //Si _validation_flag es true, continúa con la exportación.
                
                
                var _filename;
                //if(this._oTable)
                let _oTable=this.byId(_layoutId);

                // Determina qué tabla está activa y define el nombre del archivo
                if (this.getView().getModel("requestModel").getProperty("/tableEV")){
                    _filename="Layout Expo Virtuales.xmlsx";
                    _selectedLayout=_tabs[0];
                }else if(this.getView().getModel("requestModel").getProperty("/tableMP")){
                    _filename="Layout MP.xlsx";
                    _selectedLayout=_tabs[1];
                }if(this.getView().getModel("requestModel").getProperty("/tablePT")){
                    _filename="Layout PT.xlsx";
                    _selectedLayout=_tabs[2];
                }

                //Obtiene los datos enlazados a la tabla (_oTable) usando getBinding("rows"), lo que devuelve la fuente de datos.
                let oRowBinding=_oTable.getBinding("rows");
                let aCols=this.getColums(_selectedLayout);
                let oSettings={
                    workbook:{columns:aCols, hierarchyLevel:"Level"}, 
                    dataSource:oRowBinding,fileName:_filaname,worker:false};
                
                    //Crea el archivo Excel
                let oSheet=new spreadSheet(oSettings);
                oSheet.build().finally(function(){ //build(): Inicia la generación del archivo Excel.
                                                    //finally(): Se ejecuta después de la exportación.

                    oSheet.destroy();               //oSheet.destroy(): Libera los recursos después de la generación del archivo.
                });
            }

        },
        getColums:function(_laoyut){
            var _cols;
            if(_layout===_tabs[0]){
                _cols=this.getView().getModel("veColumnsModel").getData();//.getData() para obtener los datos del modelo.
            }else if(_layout===_tabls[1]){
                _cols=this.getView().getModel("mpColumsModel").getData();
            }else if(_layout=== _tabs[2]){
                _cols=this.getView().getModel("ptColumnsModel").getData();
            }
            return _cols;
        },

        getLayout:function(_layout,_oModelLayout){
            var _that=this;
            var _params=this.getUrlFilters(_layout);
            _oModelLayout.read(_params[0].url,{
                filters: _params[0].filters,success:function(oData,Result){ //success:Se ejecuta si la solicitud es exitosa,oData contiene los datos recuperados.
                    console.log(oData);
                    let _oModel=new JSONModel(); //Crea un nuevo modelo JSON (_oModel).
                    
                    _oModel.setData(oData.results);//setData(oData.results): Asigna los resultados obtenidos (oData.results) al modelo.

                    if(_layout=== _tabs[0]){
                        _that.getView().setModel(_layout.Model,"evLayoutModel");
                    }else if (_layout===_tabs[1]){
                        _that.getView().setModel(_oModel,"mpLayoutModel");
                    }else if(_layout===_tabs[2]){
                        _that.getView().getModel(_oModel,"ptLayoutModel");
                    }
                },error:function(oError){
                    console.log(oError);
                }
            });
        },

        /**
             * Building url for request
             * Building filters for request
             * This function returns two objects: 
             * URL => Entity with range of date
             * Filters => selected data to filter the content of tables
             */

        getUrlFilters:function(_layout){
            var _requestModel=this.getView().getModel("requestModel").getData();
            var _params=[];
            var _url;
            //calculate _fecha paramet
            let _dateFrom=new Date(_requestModel.dateFrom); //Convierte la fecha del modelo en un objeto Date.
            let _monthFrom=parseInt(_dateFrom.getMonth())+1;//Obtiene el mes de la fecha, pero en JavaScript los meses empiezan desde 0 +1 para arreglar el indice del mes
            _monthFrom=_monthFrom <= 9 ? "0" + _monthFrom.toString():_monthFrom.toString(); //Si el mes es de un solo dígito (1-9), se le agrega un 0 para que tenga dos caracteres (03, 04, etc.), asegurando el formato YYYYMMDD.
            
            let _dayFrom=parseInt(_dateFrom.getDate());
            _dayFrom=_dayFrom <=9 ? "0"+ _dayFrom.toString():_dayFrom.toString()
            let _dFrom=_dateFrom.getFullYear().toString()+ _monthFrom.toString()+ _dayFrom;
            
            let _dateTo=new Date(_requestModel.dateTo);
            let _monthTo=parseInt(_dateTo.getMonth())+1;
            _monthTo=_monthTo <= 9 ? "0" + _monthTo.toString(): _monthTo.toString();
            let _dayTo=parseInt(_dateTo.getDate());
            _dayTo=_dayTo <=9 ? "0" + _dayTo.toString(): _dayTo.toString();
            let _dTo=_dateTo.getFullYear().toString()+ _monthTo.toString()+_dayTo;

            let _dateParam=_dFrom + "|"+_dTo;

            //filters 
            var aFilters=[];
            var _bukrs=this.getView().getModel("requestModel").getProperty("/bukrs");

            if(_layout===_tabs[0]){
                _url="/ZZ1_CDS_LAYOUT_EV(p_fecha'"+ _dateParam+"')/Set?";
                var _invoices=this.getView().getModel("requestModel").getProperty("/invoices");
                var _po=this.getView().getModel("requestModel").getProperty("/po");
                var _materiales=this.getView().getModel("requestModel").getProperty("/material");
                var _cliente=this.getView().getModel("requestModel").getProperty("/cliente");

                if(_invoices.length > 0){
                    for(let i=0 ;i< _invoices.length; i++){
                        aFilters.push(new Filter("vbeln",FilterOperator.EQ,_invoices[i].vbeln));
                    }
                }
                if(_po.length >0){
                    for (let i=0; i< _po.length; i++){
                        aFilters.push(new Filter("ebeln", FilterOperator.EQ,_po[i].ebeln));
                    }
                }
                if(_materiales.length>0){
                    for (let i; i<_materiales.length;i++){
                        aFilters.push(new Filter("parnr", FilterOperator.EQ,_materiales[i].parnr))
                    }
                }
                if(_cliente){
                    aFilters.push(new Filter("kunnr", FilterOperator.EQ, _cliente));
                }

                if(_bukrs){
                    aFilters.push(new Filter("Bukrs", FilterOperator.EQ, _bukrs));
                }


            }else if(_layout===_tabs[1]){
                _url="/ZZ1_CDS_LAYOUT_MP(p_fecha='"+ _dateParam+"')/Set?";

                if(_requestModel.parnr){ aFilters.push(new Filter("Parnr", FilterOperator.EQ,_requestModel.parnr));}
                if(_requestModel.lifnr){
                    aFilters.push(new Filter("Lifnr", FilterOperator.EQ,_bukrs));
                }if(_bukrs){
                    aFilters.push(new Filter("Bukrs", FilterOperator.EQ,_bukrs));
                }

                }else if(layout===_tabs[2]){
                    _url="/ZZ1_CDS_LAYOUT_PT (p_fecha='"+ _dateParam+"')/Set?";
                    var _parnrItems=this.getView().byId("MainView_MultiCB_Material_PT").getSelectedItems();
                    if(_parnrItems.length >0){
                        _parnrItems.forEach(element => {
                            aFilters.push(new Filter("parnr",FilterOperator.EQ,element.getKey()))
                            
                        });
                    }if(_bukrs){
                        aFilters.push(new Filter("Bukrs",FilterOperator.EQ,_bukrs));
                    }
                }
                _params.push([{"url":_url, "filters":aFilters}]);
                return _params[0];
            
            },
            onSearchButton:function(){
                let _validation_flag=this.validations();
                var _oModelLayout;

                if(_validation_flag){
                    if(this.getView().getModel("requestModel").getProperty("/tableEV")){
                        //set model features
                        _oModelLayout=this.getView().getModel("EV_LayoutService");
                        if(this.getView().getModel("mpLayoutModel")){
                            this.getview().getModel("mpLayoutModel").setData();
                        }
                        if(this.getView().getModel("ptLayoutModel")){
                            this.getView().getModel("ptLayoutModel").setData();
                        }
                        this.getLayout(_tabs[0],_oModelLayout);
                    }else if(this.getView().getModel("requestModel").getProperty("/tableMP")){
                        //set model features
                        _oModelLayout=this.getView().getModel("MP_LayoutService");
                        if(this.getView().getModel("evLayoutModel")){
                            this.getview().getModel("evLayoutModel").setData();
                        }
                        if(this.getView().getModel("ptLayoutModel")){
                            this.getView().getModel("ptLayoutModel").setData();
                        }
                        this.getLayout(_tabs[1],_oModelLayout);

                    }if(this.getView().getModel("requestModel").getProperty("/tablePT")){
                        //set model features
                        _oModelLayout=this.getView().getModel("PT_LayoutService");
                        if(this.getView().getModel("evLayoutModel")){
                            this.getview().getModel("evLayoutModel").setData();
                        }
                        if(this.getView().getModel("mpLayoutModel")){
                            this.getView().getModel("mpLayoutModel").setData();
                        }
                        this.getLayout(_tabs[2],_oModelLayout);
                    }
                }
            },
            validations:function(){
                var _date=this.getView().byId("mainView_dateRangeSelection").getValue();
                var _return=true;

                if(!_date){
                    _return=false; 
                    MessageBox.error("elegir rango de fecha valido",{
                        title:"Error", contentWidth:"30%", dependentOn:this.getView()
                    });
                }
                return _return;
            },
            onDateChange:function(oEvent){
                var sFrom=oEvent.getParameter("from"),
                sTo=oEvent.getParameter("to"),
                bValid=oEvent.getParameter("valid"),
                oEventSource=oEvent.getSource();

                if(oEvent.getParameter("valid")){
                    this.getView().getModel("requestModel").setProperty("/dateFrom",sFrom);
                    this.getView().getModel("requestModel").setProperty("/dateTo", sTo);
            
                }else{
                    MessageBox.error("elegir rango de fecha valido",{
                        title:"Error", contentWidth:"30%", dependentOn:this.getView()
                    });
                }
            },
             /**
             * Call oData Services for PT and Virtual Layouts
             * _tabs[1] => MP
             * _tabs[2] => PT
             * 
             */
            _loadRemoteOdaataServices:function(_layout){
                var _that=this;
                if(_layout===_tabs[1]){
                    //MP Layout
                    var _MP_ModelService=this.getView().getModel("MP_LayoutService");

                    if(!this.getView().getModel("numParte_MP_Model")){
                        _MP_ModelService.reas("/ZZ1_CDS_SEARCH_HELP_PARNR/?",{
                            success:function(oData,Result){
                                console.log(oData);
                                let _oModel=new JSONModel();
                                _oModel.setData(oData.results);
                                _that.getView().setModel(_oModel,"numParte_MP_Model");
                            },error:function(oError){
                                console.log(oError);
                            }
                        });
                    }
                    if(!this.getView().getModel("lifnr_MP_Model")){
                        _MP_ModelService.read("/ZZ1_CDS_SEARCH_HELP_LIFNR/?",{
                            success:function(oData, Result){
                                console.log(oData);
                                let _oModel=new JSONModel();
                                _oModel.setData(oData.results);
                                _that.getView().setModel(_oModel,"lifnr_MP_Model");

                            },error:function(oError){
                                console.log(oError);
                            }
                        });
                    }

                    if(!this.getView().getModel("bukrs_MP_Model")){
                        _MP_ModelService.read("/ZZ1_CDS_SEARCH_HELP_BUKRS/?",{
                            success:function(oData,Result){
                                console.log(oData);
                                let _oModel=new JSONModel();
                                _oModel.setData(oData.results);
                                _that.getView().setModel(_oModel,"bukrs_MP_Model");
                            },error:function(oError){
                                console.log(oError);
                            }
                        });
                    }
                }else if(_layout === tabs[2]){
                    var _PT_ModelService=this.getView().getModel("PT_LayoutService");
                    if(!this.getView().getModel("bukrs_PT_Model")){
                        _PT_ModelService.read("/ZZ1_CDS_SEARCH_HELP_BUKRS/?",{
                            success:function(oData,Result){
                            console.log(oData);
                            let _oModel=new JSONModel();
                            _oModel.setData(oData.results);
                            _that.getView().setModel(_oModel,"bukrs_PT_Model");
                    },error:function(oError){
                        console.log(oError);
                    }
                });
                    }
                }
            },
            clearTable:function(_tableID){
                if(this.getView().getModel("requestModel").getProperty("/tableEV")){
                    if(this.getView().getModel("evLayoutModel")){
                        this.getView().getModel("evLayoutModel").setData();
                    }
                }else if(this.getView().getModel("requestModel").getProperty("/tableMP")){
                    if(this.getView().getModel("mpLayoutModel")){
                        this.getView().getModel("mpLayoutModel").setData();
                    }
                }if (this.getView().getModel("requestModel").getProperty("/tablePT")){
                    if(this.getView().getModel("ptLayoutModel")){
                        this.getView().getModel("ptLayoutModel").setData();
                    }
                }
            },
            invoicesSelectionFinish:function(oEvent){
                var selectedItems=oEvent.getParameter("selectedItems");
                var _items=[];

                if(selectedItems.length>0){
                    selectedItems.forEach((element)=> _items.push({"vbeln":element.getProperty("key")})
                );
                }
                this.getView().getModel("requestModel").setProperty("/invoices",[]);
                this.getView().getModel("requestModel").setProperty("/invoices",_items);
            },

            poSelectionFinish: function(oEvent){
                var selectedItems=oEvent.getParameter("selectedItems");
                var _items=[];

                if(selectedItems.length>0){
                    selectedItems.forEach((element)=>_items.push({"ebeln": element.getProperty("key")})
                );
                }
                this.getView().getModel("requestModel").setProperty("/po",[]);
                this.getView().getModel("requestModel").setProperty("/po",_items);
            },
            materialSelectedFinish:function(oEvent){
                var selectedItems=oEvent.getParameter("selectedItems");
                var _items=[];
                if(selectedItems.length>0){
                    selectedItems.forEach((element)=> _items.push({"Parnr":element.getProperty("key")})
                );
                }
                this.getView().getModel("requestModel").setProperty("/material",[]);
                this.getView().getModel("requestModel").setProperty("/material",_items);
            },

            });
            

        });
        