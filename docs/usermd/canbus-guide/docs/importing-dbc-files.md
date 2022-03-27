# Importing DBC files

In this guide we will use a sample J1939 DBC file `j1393.dbc` that is a slightly altered version of the demo file provided in [this introduction to CAN DBC files](https://www.csselectronics.com/pages/can-dbc-file-database-intro).

```
VERSION ""


NS_ :
    NS_DESC_
    CM_
    BA_DEF_
    BA_
    VAL_
    CAT_DEF_
    CAT_
    FILTER
    BA_DEF_DEF_
    EV_DATA_
    ENVVAR_DATA_
    SGTYPE_
    SGTYPE_VAL_
    BA_DEF_SGTYPE_
    BA_SGTYPE_
    SIG_TYPE_REF_
    VAL_TABLE_
    SIG_GROUP_
    SIG_VALTYPE_
    SIGTYPE_VALTYPE_
    BO_TX_BU_
    BA_DEF_REL_
    BA_REL_
    BA_DEF_DEF_REL_
    BU_SG_REL_
    BU_EV_REL_
    BU_BO_REL_
    SG_MUL_VAL_

BS_:

BU_:


BO_ 2364539904 EEC1: 8 Vector__XXX
 SG_ EngineSpeed : 24|16@1+ (0.125,0) [0|8031.875] "rpm" Vector__XXX

BO_ 2566844672 CCVS1: 8 Vector__XXX
 SG_ WheelBasedVehicleSpeed : 8|16@1+ (0.00390625,0) [0|250.996] "km/h" Vector__XXX


CM_ BO_ 2364539904 "Electronic Engine Controller 1";
CM_ SG_ 2364539904 EngineSpeed "Actual engine speed which is calculated over a minimum crankshaft angle of 720 degrees divided by the number of cylinders.…";
CM_ BO_ 2566844672 "Cruise Control/Vehicle Speed 1";
CM_ SG_ 2566844672 WheelBasedVehicleSpeed "Wheel-Based Vehicle Speed: Speed of the vehicle as calculated from wheel or tailshaft speed.";
BA_DEF_ SG_  "SPN" INT 0 524287;
BA_DEF_ BO_  "VFrameFormat" ENUM  "StandardCAN","ExtendedCAN","reserved","J1939PG";
BA_DEF_  "DatabaseVersion" STRING ;
BA_DEF_  "BusType" STRING ;
BA_DEF_  "ProtocolType" STRING ;
BA_DEF_  "DatabaseCompiler" STRING ;
BA_DEF_DEF_  "SPN" 0;
BA_DEF_DEF_  "VFrameFormat" "J1939PG";
BA_DEF_DEF_  "DatabaseVersion" "";
BA_DEF_DEF_  "BusType" "";
BA_DEF_DEF_  "ProtocolType" "";
BA_DEF_DEF_  "DatabaseCompiler" "";
BA_ "ProtocolType" "J1939";
BA_ "BusType" "CAN";
BA_ "DatabaseCompiler" "CSS ELECTRONICS (WWW.CSSELECTRONICS.COM)";
BA_ "DatabaseVersion" "1.0.0";
BA_ "VFrameFormat" BO_ 2364539904 3;
BA_ "SPN" SG_ 2364539904 EngineSpeed 190;
BA_ "SPN" SG_ 2566844672 WheelBasedVehicleSpeed 84;
```

First of all we need to load the CANBUS system model that contains all SA Engine functions for working with CAN bus data.

>[note] **Note:** You can disregard any `JSON.parse` errors that might arise.

```LIVE
load_system_model("canbus");
```

Then we start by translating the DBC file to our SA Engine CANBUS wrapper OSQL format.

```LIVE
can:import_dbc(sa_home() + "models/canbus-guide/j1939.dbc",
               sa_home() + "models/canbus-guide/j1939_dbc.osql",
               []);
```

The query translates the sample J1939 DBC file and stores the result in `j939_dbc.osql`:

```
/* CAN frame 0x0CF00400 BO_ 2364539904 */
create can:signal (name, cid, fid, decoder, params, options) instances
  ("EEC1_EngineSpeed", 0, 0x0CF00400, #'can:unpack_scale',['Z24u16', 0.125, 0],{"min":0,"max":8031.875});
/* CAN frame 0x18FEF100 BO_ 2566844672 */
create can:signal (name, cid, fid, decoder, params, options) instances
  ("CCVS1_WheelBasedVehicleSpeed", 0, 0x18FEF100, #'can:unpack_scale',['Z08u16', 0.00390625, 0],{"min":0,"max":250.996});
```

We see that the OSQL file contains two CAN signals "EEC1_EngineSpeed" and "CCVS1_WheelBasedVehicleSpeed".
Now that we have an OSQL definition of the DBC file we can simply load it.

```LIVE
load_osql(sa_home() + "models/canbus-guide/j1939_dbc.osql");
```

>[warning] **Important:** Loading the same signal definitions multiple times with `load_osql(<osql-dbc-file>)` result in "Violating unique index for name(Signal s)->Charstring" errors. To prevent this you can delete previously loaded signals with `delete_objects(select cs from can:signal cs)` before loading signal definitions.

To verify that the signals were defined we can list all signals and see that "EEC1_EngineSpeed" and "CCVS1_WheelBasedVehicleSpeed" are present in the output.

```LIVE
signals();
```

