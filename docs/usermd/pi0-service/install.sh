#!/bin/bash
# Create sensor service if not available
if [ ! -f /etc/systemd/system/environphat_server.service ]; then
    systemctl link ~/SA/models/pi0_sensors/environphat_server.service
    systemctl daemon-reload
    systemctl enable environphat_server.service
fi

# Read connection config from stdin.
echo "Enter connection config to use:"
rm connect.blob || true
while read line
do
  # break if the line is empty
  [ -z "$line" ] && break
  echo "$line" >> "connect.blob"
done

# Create sa.engine service if not available
if [ ! -f /etc/systemd/system/sa.engine.service ]; then
    #ln -l ~/SA/models/pi0/sa.engine.service /etc/systemd/system/sa.engine.service
    systemctl link ~/SA/models/pi0_sensors/sa.engine.service
    systemctl daemon-reload
    systemctl enable sa.engine.service
fi




