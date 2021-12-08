#!/usr/bin/python3
import logging
import threading,queue
import json
import sys
import time
import socket
from envirophat import light, motion, weather, leds
def thread_function(conn):
    dt = 0.01
    tick = 0
    try:
        while True:
            leds.on()
            ct = time.time()
            acc = str(motion.accelerometer())[1:-1]
            conn.send(str.encode("%f,1,%s\n" %(ct,acc)))
            if tick % 20 == 0:
                temp = weather.temperature()
                conn.send(str.encode("%f,2,%f\n" % (ct,temp)))
            if tick % 10 == 0:
                heading = motion.heading()
                conn.send(str.encode("%f,3,%f\n" % (ct,heading)))
            if tick % 20 == 0:
                press = weather.pressure()
                conn.send(str.encode("%f,4,%f\n" % (ct,press)))
            if tick % 10 == 0:
                lux = light.light()
                conn.send(str.encode("%f,5,%f\n" % (ct,lux)))
            if tick % 10 == 0:
                rgb = str(light.rgb())[1:-1].replace(' ', '')
                conn.send(str.encode("%f,6,%s\n" % (ct,rgb)))
            et = time.time()
            tl = dt - (et-ct)
            tick = tick+1
            if tick > 100:
                tick = 0
            leds.off()
            if tl > 0:
                time.sleep(tl)
    except:
        leds.off()

def serverfn(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("localhost", port))
        s.listen()
        while True:
            conn, addr = s.accept()
            threading.Thread(target=thread_function, args=(conn,)).start()

if __name__ == "__main__":
    serverfn(int(sys.argv[1]))