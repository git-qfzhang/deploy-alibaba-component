"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcFunction = void 0;
var fc_base_1 = require("./fc-base");
var _ = __importStar(require("lodash"));
var path = __importStar(require("path"));
var trigger_1 = require("./trigger");
var core = __importStar(require("@serverless-devs/core"));
var FcFunction = /** @class */ (function (_super) {
    __extends(FcFunction, _super);
    function FcFunction(functionConfig, credentials, region, serviceName) {
        var _this = _super.call(this, region, credentials, functionConfig.import, functionConfig.protect) || this;
        _this.functionConfig = functionConfig;
        delete _this.functionConfig.import;
        delete _this.functionConfig.protect;
        _this.serviceName = serviceName;
        return _this;
    }
    FcFunction.prototype.validateConfig = function () {
        if (_.isNil(this.serviceName) && _.isNil(this.functionConfig.service)) {
            throw new Error('Please add serviceConfig in your serverless service or service attribute in your functionConfig');
        }
        if (!_.isNil(this.serviceName) && _.isNil(this.functionConfig.service)) {
            this.functionConfig.service = this.serviceName;
        }
        else if (!_.isNil(this.serviceName) && !_.isNil(this.functionConfig.service) && this.serviceName !== this.functionConfig.service) {
            throw new Error("Please make service attribute of function: " + this.functionConfig.name + " consistent with serviceName in serviceConfig");
        }
        if (!_.isNil(this.functionConfig.filename)) {
            this.functionConfig.filename = path.resolve(this.functionConfig.filename);
        }
    };
    FcFunction.prototype.getTriggerNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var triggerConfigFilePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pulumiStackDirCheck();
                        triggerConfigFilePath = path.join(this.pulumiStackDir, trigger_1.FcTrigger.configFileName);
                        return [4 /*yield*/, fc_base_1.FcBase.getResourceUnderParent(this.functionConfig.name, 'function', trigger_1.FcTrigger.keyInConfigFile, trigger_1.FcTrigger.keyInResource, triggerConfigFilePath)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcFunction.prototype.delTriggersUnderFunction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var triggerConfigFilePath, removedTriggersNames;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pulumiStackDirCheck();
                        triggerConfigFilePath = path.join(this.pulumiStackDir, trigger_1.FcTrigger.configFileName);
                        return [4 /*yield*/, fc_base_1.FcBase.delReourceUnderParent(this.functionConfig.name, 'function', trigger_1.FcTrigger.keyInConfigFile, trigger_1.FcTrigger.keyInResource, triggerConfigFilePath)];
                    case 1:
                        removedTriggersNames = _a.sent();
                        this.logger.info("remove triggers " + removedTriggersNames + " under function: " + this.functionConfig.name + ".");
                        return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.initConfigFileAttr(this.serviceName, FcFunction.configFileName);
                return [2 /*return*/];
            });
        });
    };
    FcFunction.prototype.importResource = function (access, appName, projectName, curPath) {
        return __awaiter(this, void 0, void 0, function () {
            var pulumiImportStateID, pulumiImportState, resourceName, resourceID, parentUrn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pulumiImportStateID = FcFunction.genStateID(this.region, this.serviceName, this.functionConfig.name);
                        return [4 /*yield*/, core.getState(pulumiImportStateID)];
                    case 1:
                        pulumiImportState = _a.sent();
                        if (!(this.isPulumiImport && !(pulumiImportState === null || pulumiImportState === void 0 ? void 0 : pulumiImportState.isImport))) return [3 /*break*/, 4];
                        resourceName = this.functionConfig.name;
                        resourceID = this.serviceName + ":" + this.functionConfig.name;
                        parentUrn = "urn:pulumi:" + this.stackID + "::" + this.stackID + "::alicloud:fc/service:Service::" + this.serviceName;
                        return [4 /*yield*/, this.pulumiImport(access, appName, projectName, curPath, 'function', resourceName, resourceID, parentUrn)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, core.setState(pulumiImportStateID, { isImport: true })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.genStateID = function (region, serviceName, functionName) {
        return region + "-" + serviceName + "-" + functionName;
    };
    FcFunction.prototype.delFunctionInConfFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delResourceInConfFile(this.functionConfig, FcFunction.keyInConfigFile, FcFunction.keyInResource)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcFunction.prototype.addFunctionInConfFile = function (assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addResourceInConfFile(this.functionConfig, FcFunction.keyInConfigFile, FcFunction.keyInResource, assumeYes)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clearVm, functionStateID, triggerNames, _i, triggerNames_1, triggerName, triggerStateID, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clearVm = core.spinner('clearing...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        functionStateID = FcFunction.genStateID(this.region, this.serviceName, this.functionConfig.name);
                        return [4 /*yield*/, fc_base_1.FcBase.zeroImportState(functionStateID)];
                    case 2:
                        _a.sent();
                        this.logger.debug('zero function import state done');
                        return [4 /*yield*/, this.getTriggerNames()];
                    case 3:
                        triggerNames = _a.sent();
                        _i = 0, triggerNames_1 = triggerNames;
                        _a.label = 4;
                    case 4:
                        if (!(_i < triggerNames_1.length)) return [3 /*break*/, 7];
                        triggerName = triggerNames_1[_i];
                        triggerStateID = trigger_1.FcTrigger.genStateID(this.region, this.serviceName, this.functionConfig.name, triggerName);
                        return [4 /*yield*/, fc_base_1.FcBase.zeroImportState(triggerStateID)];
                    case 5:
                        _a.sent();
                        this.logger.debug("zero trigger: " + triggerName + " import state done");
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        clearVm.succeed('clear done.');
                        return [3 /*break*/, 9];
                    case 8:
                        e_1 = _a.sent();
                        clearVm.fail('clear error.');
                        throw e_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.keyInConfigFile = 'function';
    FcFunction.keyInResource = 'name';
    FcFunction.configFileName = 'fc-function.json';
    return FcFunction;
}(fc_base_1.FcBase));
exports.FcFunction = FcFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZjL2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQW1DO0FBQ25DLHdDQUE0QjtBQUU1Qix5Q0FBNkI7QUFDN0IscUNBQXNDO0FBQ3RDLDBEQUE4QztBQWlDOUM7SUFBZ0MsOEJBQU07SUFRcEMsb0JBQVksY0FBOEIsRUFBRSxXQUF5QixFQUFFLE1BQWMsRUFBRSxXQUFtQjtRQUExRyxZQUNFLGtCQUFNLE1BQU0sRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsT0FBTyxDQUFDLFNBSzFFO1FBSkMsS0FBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsT0FBTyxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxPQUFPLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1FBQ25DLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDOztJQUNqQyxDQUFDO0lBRUQsbUNBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3JFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUdBQWlHLENBQUMsQ0FBQztTQUNwSDtRQUNELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNoRDthQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO1lBQ2xJLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQThDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxrREFBK0MsQ0FBQyxDQUFDO1NBQ3hJO1FBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUFFO0lBQzVILENBQUM7SUFFSyxvQ0FBZSxHQUFyQjs7Ozs7O3dCQUNFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO3dCQUNyQixxQkFBcUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsbUJBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDaEYscUJBQU0sZ0JBQU0sQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsbUJBQVMsQ0FBQyxlQUFlLEVBQUUsbUJBQVMsQ0FBQyxhQUFhLEVBQUUscUJBQXFCLENBQUMsRUFBQTs0QkFBM0osc0JBQU8sU0FBb0osRUFBQzs7OztLQUM3SjtJQUVLLDZDQUF3QixHQUE5Qjs7Ozs7O3dCQUNFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO3dCQUNyQixxQkFBcUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsbUJBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDMUQscUJBQU0sZ0JBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsbUJBQVMsQ0FBQyxlQUFlLEVBQUUsbUJBQVMsQ0FBQyxhQUFhLEVBQUUscUJBQXFCLENBQUMsRUFBQTs7d0JBQTFLLG9CQUFvQixHQUFHLFNBQW1KO3dCQUNoTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBbUIsb0JBQW9CLHlCQUFvQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksTUFBRyxDQUFDLENBQUM7Ozs7O0tBQzFHO0lBRUsseUJBQUksR0FBVjs7O2dCQUNFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7OztLQUN0RTtJQUNLLG1DQUFjLEdBQXBCLFVBQXFCLE1BQWMsRUFBRSxPQUFlLEVBQUUsV0FBbUIsRUFBRSxPQUFZOzs7Ozs7d0JBQy9FLG1CQUFtQixHQUFXLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3BGLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBQTs7d0JBQWpFLGlCQUFpQixHQUFRLFNBQXdDOzZCQUNuRSxDQUFBLElBQUksQ0FBQyxjQUFjLElBQUksRUFBQyxpQkFBaUIsYUFBakIsaUJBQWlCLHVCQUFqQixpQkFBaUIsQ0FBRSxRQUFRLENBQUEsQ0FBQSxFQUFuRCx3QkFBbUQ7d0JBQy9DLFlBQVksR0FBVyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQzt3QkFDaEQsVUFBVSxHQUFNLElBQUksQ0FBQyxXQUFXLFNBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFNLENBQUM7d0JBQy9ELFNBQVMsR0FBRyxnQkFBYyxJQUFJLENBQUMsT0FBTyxVQUFLLElBQUksQ0FBQyxPQUFPLHVDQUFrQyxJQUFJLENBQUMsV0FBYSxDQUFDO3dCQUNsSCxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBQTs7d0JBQS9HLFNBQStHLENBQUM7d0JBQ2hILHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQTs7d0JBQTVELFNBQTRELENBQUM7Ozs7OztLQUVoRTtJQUVNLHFCQUFVLEdBQWpCLFVBQWtCLE1BQWMsRUFBRSxXQUFtQixFQUFFLFlBQW9CO1FBQ3pFLE9BQVUsTUFBTSxTQUFJLFdBQVcsU0FBSSxZQUFjLENBQUM7SUFDcEQsQ0FBQztJQUVLLDBDQUFxQixHQUEzQjs7Ozs0QkFDUyxxQkFBTSxJQUFJLENBQUMscUJBQXFCLENBQWlCLElBQUksQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUE7NEJBQWxJLHNCQUFPLFNBQTJILEVBQUM7Ozs7S0FDcEk7SUFFSywwQ0FBcUIsR0FBM0IsVUFBNEIsU0FBbUI7Ozs7NEJBQzdDLHFCQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBaUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLEVBQUE7O3dCQUF0SSxTQUFzSSxDQUFDOzs7OztLQUN4STtJQUVLLDBCQUFLLEdBQVg7Ozs7Ozt3QkFDUSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzs7Ozt3QkFHcEMsZUFBZSxHQUFXLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQy9HLHFCQUFNLGdCQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxFQUFBOzt3QkFBN0MsU0FBNkMsQ0FBQzt3QkFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQzt3QkFFdEIscUJBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFBOzt3QkFBckQsWUFBWSxHQUFhLFNBQTRCOzhCQUNyQixFQUFaLDZCQUFZOzs7NkJBQVosQ0FBQSwwQkFBWSxDQUFBO3dCQUEzQixXQUFXO3dCQUNkLGNBQWMsR0FBVyxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7d0JBQzFILHFCQUFNLGdCQUFNLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxFQUFBOzt3QkFBNUMsU0FBNEMsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQWlCLFdBQVcsdUJBQW9CLENBQUMsQ0FBQzs7O3dCQUg1QyxJQUFZLENBQUE7Ozt3QkFLdEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzs7Ozt3QkFFL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDN0IsTUFBTSxHQUFDLENBQUM7Ozs7O0tBRVg7SUFuRk0sMEJBQWUsR0FBRyxVQUFVLENBQUM7SUFDN0Isd0JBQWEsR0FBRyxNQUFNLENBQUM7SUFDdkIseUJBQWMsR0FBRyxrQkFBa0IsQ0FBQztJQWtGN0MsaUJBQUM7Q0FBQSxBQXhGRCxDQUFnQyxnQkFBTSxHQXdGckM7QUF4RlksZ0NBQVUifQ==