<template>
    <div>
        <div class="content">
            <div class="spreadContainer" id="ss">
                <!-- <gc-spread-sheets :hostClass="'spreadHost'">
                    <gc-worksheet :dataSource="dataSource">
                        <gc-column :width="'150'" :dataField="'name'"></gc-column>
                        <gc-column :width="'150'" :dataField="'phone'"></gc-column>
                        <gc-column :width="'150'" :dataField="'country'"></gc-column>
                        <gc-column :width="'150'" :dataField="'email'"></gc-column>
                        <gc-column :width="'150'" :dataField="'onJob'"></gc-column>
                    </gc-worksheet>
                </gc-spread-sheets>-->
            </div>
        </div>

        <div class="layout_h">
            <button type="primary" mini @click="tapSave">保存</button>
            <!-- <x-button type="primary" mini @click.native="tapExport">导出</x-button> -->
        </div>
    </div>
</template>
<script>
import "@grapecity/spread-sheets-vue";

import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";
import GC from "@grapecity/spread-sheets";
import "@grapecity/spread-sheets-resources-zh";
GC.Spread.Common.CultureManager.culture("zh-cn");

// import { XButton } from "vux";
import DataService from "./dataService.js";

let spreadNS = GC.Spread.Sheets;

export default {
    //    name: 'sample-header'
    components: {
        // XButton
    },
    data() {
        return {
            dataSource: DataService.getEmployeesData(),
            hostClass: "spread-host",

            spread: null,
            excelIo: null
        };
    },
    mounted() {
        let spread = new GC.Spread.Sheets.Workbook(
            document.getElementById("ss"),
            { sheetCount: 2 }
        );
        this.spread = spread;

        this.initSpread(spread);
    },
    methods: {
        initSpread(spread) {
            var sheet = spread.getSheet(0);
            sheet.suspendPaint();
            this.loadData(spread);
            this.setValidator(spread);
            sheet.resumePaint();
        },
        setValidator(spread) {
            var sheet = spread.getActiveSheet();

            spread.options.highlightInvalidData = true;

            //ListValidator
            var dv1 = new spreadNS.DataValidation.createListValidator(
                "Fruit,Vegetable,Food"
            );
            dv1.inputTitle("Please choose a category:");
            dv1.inputMessage("Fruit, Vegetable, Food");
            for (var i = 5; i < 11; i++) {
                sheet.setDataValidator(i, 2, dv1);
            }

            //FormulaListValidator
            var dv2 = new spreadNS.DataValidation.createFormulaListValidator(
                "$A$5:$A$6"
            );
            for (var i = 5; i < 11; i++) {
                sheet.setDataValidator(i, 4, dv2);
            }
        },
        loadData(spread) {
            var sheet = spread.getActiveSheet();

            sheet.setRowHeight(3, 40);

            sheet.setValue(3, 0, "Shopping Place");

            var storage = window.localStorage;

            if (storage["storage"]) {
                sheet.setValue(3, 0, storage["storage"]);
            }

            var title = sheet.getCell(3, 0);
            title.font("bold 20px arial");
            title.vAlign(spreadNS.VerticalAlign.center);
            title.backColor("#D1CBC5");
            sheet.setColumnWidth(0, 160);
            sheet.setColumnWidth(1, 35);
            sheet
                .getRange(3, 0, 3, 1)
                .setBorder(
                    new spreadNS.LineBorder("Black", spreadNS.LineStyle.thin),
                    { all: true }
                );
            sheet.setValue(4, 0, "Wal-Mart");
            sheet.setValue(5, 0, "Other");
            sheet.getCell(4, 0).font("bold 15px arial");
            sheet.getCell(5, 0).font("bold 15px arial");
            var startRow = 3;
            var startCol = 1;
            sheet.addSpan(startRow + 0, startCol + 0, 1, 4);
            sheet.setRowHeight(startRow + 0, 40);
            sheet.setValue(startRow + 0, startCol + 0, "Goods List");
            var title = sheet.getCell(startRow + 0, startCol + 0);
            title.font("bold 30px arial");
            title.vAlign(spreadNS.VerticalAlign.center);
            title.backColor("#D1CBC5");

            sheet.setColumnWidth(startCol + 0, 100);
            sheet.setColumnWidth(startCol + 1, 100);
            sheet.setColumnWidth(startCol + 2, 100);
            sheet.setColumnWidth(startCol + 3, 120);
            sheet
                .getRange(startRow + 0, startCol + 0, 8, 4)
                .setBorder(
                    new spreadNS.LineBorder("Black", spreadNS.LineStyle.thin),
                    { all: true }
                );

            sheet.setValue(startRow + 1, startCol + 0, "Name");
            sheet.setValue(startRow + 1, startCol + 1, "Category");
            sheet.setValue(startRow + 1, startCol + 2, "Price");
            sheet.setValue(startRow + 1, startCol + 3, "Shopping Place");
            for (var i = 0; i < 4; i++) {
                sheet
                    .getCell(startRow + 1, startCol + i)
                    .font("bold 15px arial");
            }

            sheet.setValue(startRow + 2, startCol + 0, "Apple");
            sheet.setValue(startRow + 3, startCol + 0, "Potato");
            sheet.setValue(startRow + 4, startCol + 0, "Tomato");
            sheet.setValue(startRow + 5, startCol + 0, "Sandwich");
            sheet.setValue(startRow + 6, startCol + 0, "Hamburger");
            sheet.setValue(startRow + 7, startCol + 0, "Grape");

            sheet.setValue(startRow + 2, startCol + 1, "Fruit");
            sheet.setValue(startRow + 3, startCol + 1, "Vegetable");
            sheet.setValue(startRow + 4, startCol + 1, "Vegetable");
            sheet.setValue(startRow + 5, startCol + 1, "Food");
            sheet.setValue(startRow + 6, startCol + 1, "Food");
            sheet.setValue(startRow + 7, startCol + 1, "Fruit");

            sheet.setValue(startRow + 2, startCol + 2, 1.0);
            sheet.setValue(startRow + 3, startCol + 2, 2.01);
            sheet.setValue(startRow + 4, startCol + 2, 3.21);
            sheet.setValue(startRow + 5, startCol + 2, 2);
            sheet.setValue(startRow + 6, startCol + 2, 2);
            sheet.setValue(startRow + 7, startCol + 2, 4);
            var myFormatter = new GC.Spread.Formatter.GeneralFormatter(
                "$#,##0.00;[Red] $#,##0.00"
            );
            for (var i = 2; i < 8; i++) {
                sheet
                    .getCell(startRow + i, startCol + 2)
                    .formatter(myFormatter);
            }

            sheet.setValue(startRow + 2, startCol + 3, "Wal-Mart");
            sheet.setValue(startRow + 3, startCol + 3, "Other");
            sheet.setValue(startRow + 4, startCol + 3, "Other");
            sheet.setValue(startRow + 5, startCol + 3, "Wal-Mart");
            sheet.setValue(startRow + 6, startCol + 3, "Wal-Mart");
            sheet.setValue(startRow + 7, startCol + 3, "Other");
            //set invalid data
            sheet.setValue(6, 2, "sss");
            sheet.setValue(10, 4, "Sun Store");
        },
        tapExport() {
            var fileName = "demo.xlsx";

            var json = this.spread.toJSON();

            // here is excel IO API
            this.excelIo = new GC.Spread.Excel.IO();

            this.excelIo.save(
                json,
                function(blob) {
                    saveAs(blob, fileName);
                },
                function(e) {
                    // process error
                    console.log(e);
                },
                { password: "666" }
            );
        },
        tapSave() {
            var sheet = this.spread.getActiveSheet();

            var storage = window.localStorage;

            storage["storage"] = sheet.getValue(3, 0);
        }
    }
};
</script>

<style>
.layout_h {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>



<style scoped>
.componentContainer {
    /* position: absolute; */
    padding: 10px;
    /* left: 242px; */
    top: 0;
    bottom: 20px;
    right: 0;
}
.spreadContainer {
    padding: 10px;
    box-shadow: 0 0 20px grey;
}
.spreadContainer {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
}
.spreadHost {
    width: 100%;
    height: 100%;
}
</style>

<style>
#app {
    font-size: 14px;
    margin-top: 10px;
    margin: 0 10%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    -webkit-box-shadow: 0 0 20px #e3e3e3;
    box-shadow: 0 0 20px #e3e3e3;
}
.content {
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;

    width: 100%;
}
.nav {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 20px;
    padding: 0 10px;
    width: 200px;
    border-right: 2px solid #e3e3e3;
}
.gc-scrollbar::-webkit-scrollbar-track {
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
    background-color: #efeff0;
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
.gc-scrollbar::-webkit-scrollbar-button:decrement {
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
    height: 8px;
    /*background:url("../img/triangle-up.png") no-repeat center;*/
    background-size: 10px 5px;
    background-color: #ffffff;
    /*background-image: url("data:image/svg+xml;charset=utf-8,<svg viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><line id='l' x1='60' x2='60' y1='7' y2='27' stroke='%236c6c6c' stroke-width='11' stroke-linecap='round'/></defs><g><use xlink:href='%23l' opacity='.27'/><use xlink:href='%23l' opacity='.27' transform='rotate(30 60,60)'/></g></svg>");*/
}
.gc-scrollbar::-webkit-scrollbar-button:increment {
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
    height: 8px;
    /*background:url("../img/triangle-down.png") no-repeat center;*/
    background-size: 10px 5px;
    background-color: #ffffff;
    /*background-image: url("data:image/svg+xml;charset=utf-8,<svg viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><line id='l' x1='60' x2='60' y1='7' y2='27' stroke='%236c6c6c' stroke-width='11' stroke-linecap='round'/></defs><g><use xlink:href='%23l' opacity='.27'/><use xlink:href='%23l' opacity='.27' transform='rotate(30 60,60)'/></g></svg>");*/
}

/* Handle */
.gc-scrollbar::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background-color: #a7a7a7;
    /*background:rgba(153,153,153,0.7);*/
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);*/
}
.gc-scrollbar::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(153, 153, 153, 0.4);
}
.gc-scrollbar-thin::-webkit-scrollbar {
    width: 4px;
}
.gc-scrollbar-thin::-webkit-scrollbar-thumb {
    -webkit-border-radius: 1px;
    border-radius: 1px;
    background-color: #666666;
    /*background:rgba(153,153,153,0.7);*/
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);*/
}
.gc-scrollbar-thin::-webkit-scrollbar-button:decrement,
.gc-scrollbar-thin::-webkit-scrollbar-button:increment {
    height: 0;
    width: 0;
}
.logo {
    position: absolute;
    top: 50%;
    margin-top: -20px;
    width: 40px;
    height: 40px;
    left: 80px;
}

img {
    max-width: 100%;
    width: auto;
    height: auto;
    vertical-align: middle;
    border: 0;
    -ms-interpolation-mode: bicubic;
}

body {
    font-family: "Gotham SSm A", "Gotham SSm B";
    font-size: 14px;
    color: #333333;
    background-color: #ffffff;
}

h3 {
    font-size: 24px;
}

h2,
h3,
h4,
h5,
h6 {
    margin: 10px 0;
    font-family: "Forza SSm A", "Forza SSm B";
    font-weight: bold;
    line-height: 20px;
    color: inherit;
    text-rendering: optimizelegibility;
}

.test-btn-list label input[type="checkbox"] {
    margin: 5px;
}

.test-btn-list label input[type="text"],
.test-btn-list label input[type="color"],
.test-btn-list label input[type="number"] {
    margin: 0 5px;
}

label {
    font-weight: normal;
}
</style>
