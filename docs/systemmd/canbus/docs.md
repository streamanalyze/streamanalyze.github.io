# CANBUS meta-data model

This *CANBUS wrapper* model describes generic meta-data for data
streams from all kinds of
[CANBUS](https://en.wikipedia.org/wiki/CAN_bus) interfaces. A raw
CANBUS stream produces *data frames* represented as tuples
`(ts,cid,fid,p)` where `ts` is a time stamp for the frame, `cid` is a
numeric identifier of the CANBUS interface producing the data frame,
`fid` is the frame identifier, and `p` is the payload of the frame.

The tutorial [Tutorial->Data stream
wrappers](/docs/md/tutorial/data-stream-wrappers.md) includes an
introduction of how to use the CANBUS wrapper.
