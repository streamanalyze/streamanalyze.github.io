#!/bin/bash

# Comment this line if you do not wish to remove image
~/sa.engine/bin/sa.engine -x
~/sa.engine/bin/sa.engine -o "load_model('environphat');" -o "start_edge('pi0');"