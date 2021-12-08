# Getting starting with sa.engine, raspberry pi and a SAMA5D27
Before following this guide make sure that.
1.	You have a SAMA5D27 from [Microchip](https://www.microchip.com/en-us/development-tool/DM320117) with Yocto Linux installed according to: [linux4sam](https://www.linux4sam.org/bin/view/Linux4SAM/Sama5d27Som1EKMainPage)
2.	You have configured the SAMA5D27 so that it has access to the internet.
3. You have access to the terminal on the SAMA5D27. Either via COM or SSH.

All commands issued on the SAMA5D27 are issued from `/home/root`.

Start by going to [https://studio.streamanalyze.com/download#tgeneral](https://studio.streamanalyze.com/download#tgeneral) 
and copy the link address for the Raspberru pi (RPI) download.

Next download sa.engine to the SAMA5D27 by entering the following wget command from a terminal on the SAMA5D27: (I had an issue with certificates on my SAMA5D27.

> [note]   **Note:** If you haven't set the time and root certificates correct on the SAMA5D27 board
you can circumvent the certificate error by adding `--no-check-certififcates` to the wget command. 

```sh
wget -O "sa.engine.tgz" "<COPIED-URL-FROM-DOWNLOAD-PAGE>"
tar -xzf sa.engine.tgz
```

You can check that the download worked with
```sh
./sa.engine/bin/sa.engine
Database image: /home/root/sa.engine/bin/sa.engine.dmp
Release 3, v5, 32 bits
[sa.engine] 1> system_version();
"sa.engine Release 3.5.9"
0.003 s
[sa.engine] 1> quit;
```

Now go to the device hub in your sa.studio community (alt+4) and copy the "Base64 encoded JSON config for connecting as edge." and paste
it to a file  `/home/root/sa.engine/bin/connect.txt`.

Next create a new file `/home/root/sa.engine/bin/start.osql` and add the following content:
```
/* 
(re)Connect to federation with connect config located in 
file connect.txt next to the sa.engine executable 
overriding the peer name to "SAMA5-<IDENTIFIER>" as an edge 
*/
reconnect_using_config_blob(read_file(startup_dir()+"/connect.txt"),
                            "SAMA5-<IDENTIFIER>",true);
```

> [note]   **Note:** Remember to change `<IDENTIFIER>` to your own identifier, the rest of this guide assumes `<IDENTIFIER>=22` 


At this point you can start sa.engine as an edge to your federation by issuing the following command:
```
./sa.engine/bin/sa.engine -O /home/root/sa.engine/bin/start.osql
```
You should now see the following in your terminal:
```
root@sama5d27-wlsom1-ek-sd:~# ./sa.engine/bin/sa.engine -O /home/root/sa.engine/bin/start.osql
Database image: /home/root/sa.engine/bin/sa.engine.dmp
Release 3, v5, 32 bits
Reading OSQL statements from "/home/root/sa.engine/bin/start.osql"
2021-10-07T20:16:45.234 Edge SAMA5-22 waiting for query from SERVER...
```

## Running sa.engine as a service on the SAMA5D27.

In this next step we will add two services at boot to the SAMA5D27. One for starting the WIFI and one for starting sa.engine as an edge connecting the the raspberry pi. If you've already solved the network connection you do not need the `sysv_sama_wifi`.

Copy the template for an system V (init.d) script from [github/fhd](https://github.com/fhd/init-script-template/blob/master/template)

And create two copies of it `/home/root/sysv_sa_edge` and `/home/root/sysv_sama_wifi` and allow executing on both.
```sh
chmod +x sysv_sama_wifi
chmox +x sysv_sa_edge
```

Open up `/home/root/sysv_sa_edge` and change the lines starting with `dir=` and `cmd=` to:

```sh
dir="/home/root/sa.engine/bin"
cmd="./sa.engine -O start.osql"
```

Now do the same for `/home/root/sysv_sama_wifi`:
```sh
dir="/home/root"
cmd="./Start_STA.sh"
```
Now add symlinks in the right runlevel catalog (in our setup it was `/etc/rc5.d`):

```sh
ln -s /home/root/sysv_sama_wifi /etc/rc5.d/S93samawifi
ln -s /home/root/sysv_sa_edge /etc/rc5.d/S99sa_edge
```

Reboot the SAMA5D27:
```sh
reboot
```

Let's wait for the SAMA5D27 to connect:
```LIVE
wait_for("SAMA-22")
```


The query will return true once the SAMA5D27 is connected. This might take a few minutes depending on how fast the SAMA5D27 boots and connects to a network.
