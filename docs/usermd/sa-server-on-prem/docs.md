# Hosting your own SA Studio Environment

This is a step-by-step guide that explains how to get an SA Studio Environment up and running on a Linux machine as systemd services with secure TLS communication and external access through HTTPS. The Linux machine can either be located **on premises** or in **your proprietary cloud**.

> [note] **Requirements**
>
> For this guide to work you need the following:
>
> 1. The files:
> 
>    ```
>    sa.server.service
>    sa.studio.service
>    sas_config.osql
>    sas_config.sh
>    ```
>
>    The `sa.*.service` files are systemd service specification files, and the `sas_config.*` files are for configuring TLS certificates and starting the SA Studio and SA Server instances with the correct parameters.
>
>    If you do not have these files already, please contact us and we will provide them for you.
>
> 2. Administrative rights for your firewall and DNS settings for the subdomain on which you wish to run the services.


## Running SA Studio Environment as systemd services

1. Put the files `sa.server.service`, `sa.studio.service`, `sas_config.osql`, and `sas_config.sh` in a local folder on the linux machine.

    For example:

    ```
    /home/<user>/sas_config/
        sa.server.service
        sa.studio.service
        sas_config.osql
        sas_config.sh    
    ```

2. Download and unpack `sa_engine_linux_x64_prebuilt.tar.gz` from [https://studio.streamanalyze.com/download/#tlinux](https://studio.streamanalyze.com/download/#tlinux).

3.	Set environment variable `SA_ENGINE_HOME` to the path where the `sa.engine` folder you unpacked is located (include the `sa.engine` folder in the path).

    For example:

    ```bash
    export SA_ENGINE_HOME=/home/<user>/sa.engine
    ```

    Alternatively you can alter `sas_config.sh` to set `SA_ENGINE_HOME` there. The same goes for all configuration variables.

4. Know what public IP or DNS name the server will be reachable on.

5. Set the environment variable `SA_HOSTNAME` to the public IP address.

    For example:

    ```bash
    export SA_HOSTNAME=123.123.123.123
    ```

6. Decide what folder you want `SA_HOME` to be by setting environment variable `SA_HOME`.

    For example:

    ```bash
    export SA_HOME=/home/<user>/SA
    ```

7. Copy the file `sas_config.osql` into the `SA_HOME` folder.

8. Generate cryptographic certificates for communication between SA Engine instances, including edge devices:

    ```bash
    cd /home/<user>/sas_config
    ./sas_config.sh gen_cert
    ```

    You should now have a folder `${SA_HOME}/tls` with certificates and keys.

9. Replace all placeholders in `sa.server.service` and `sa.studio.service` with correct values.

    Placeholder                 | Description
    ----------------------------|------------
    `<path-to-sas_config.sh>`   | The full path to the file `sas_config.sh`, e.g., `/home/<user>/sas_config/sas_config.sh`.
    `<path-to-sa-home>`         | The full path to `SA_HOME`, e.g., `/home/<user>/SA`.
    `<desired-user>`            | The user you want to run the services.
    `<ip>`                      | The public IP of the machine.
    `<path-to-sa.engine>`       | The full path to `SA_ENGINE_HOME`, e.g., `/home/<user>/sa.engine`.
    `<path-to-sa.engine/bin>`   | The full path to `${SA_ENGINE_HOME}/bin`, e.g., `/home/<user>/sa.engine/bin`.


10. Install services sa.server.service and sa.studio.service:

    ```bash
    cd /home/<user>/sas_config
    sudo systemctl link $(pwd)/sa.server.service
    sudo systemctl link $(pwd)/sa.studio.service
    ```

11.	Reload daemon and enable services:

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable sa.server.service     # make service start on boot
    sudo systemctl enable sa.studio.service
    sudo systemctl start sa.server.service      # start service right now
    sudo systemctl start sa.studio.service
    ```

12.	Verify that services were started:

    ```bash
    sudo systemctl status sa.server.service
    sudo systemctl status sa.studio.service
    ```

13.	Verify that you can access SA Studio by opening up a web browser on the machine and typing in the URL `localhost:3001`.


The SA Studio Environment now use TLS encryption for communication between SA Engine instances, including edge devices. Next we will enable HTTPS so external browswers can communicate safely with SA Studio.


## Enabling HTTPS

To enable HTTPS, SA Studio requires a server key, a CA certificate and a server certificate signed by the CA. If you already have that, you can skip to [Step 3](#step-3-configure-sa-studio-to-use-ssl) below.

### Step 1 - Make an entry in the DNS

To enable HTTPS you first need to add a subdomain for the machine in the DNS. In this guide we use Amazon Route 53 for DNS configuration.

This guide shows how to generate SSL certificates using [SSL For Free](https://sslforfree.com). This assumes that you have DNS admin rights to your subdomain -- to the extent that SSL For Free is able to verify ownership.

If you don't have such admin rights, you can still generate SSL keys for your HTTPS using other tools than SSL For Free. However, if your server certificate is not signed by an official CA, your browser will show certificate warnings.

Note that your SA Studio instance does not have to be reachable on the internet. SSL For Free just needs to verify domain ownership using e.g. DNS or email as described below.


1. Go to your hosted zones in Route 53, select the "Records" tab and click the "Create record" button.

    <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_0-1_Route_53_DNS_config.png" alt="Step_0-1_Route_53_DNS_config.png" width="700" />

2. In the "Choose routing policy" dialog that appears, select "Simple routing" and click "Next".

    <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_0-2_Simple_record.png" alt="Step_0-2_Simple_record.png" width="400" />

3. In the "Define simple record" dialog, write the name of your subdomain, select record type "A" and write the public IP address in the "IP address or another value..." textbox. Finalize the record setup by clicking the "Define simple record" button.

    <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_0-3_Specify_A_record.png" alt="Step_0-3_Specify_A_record.png" width="400" />

You should now have a DNS record that you can use for your SSL certificate.

### Step 2 - Generate a certificate for the subdomain

Now we are going to generate an SSL certificate for the subdomain we set up in the previous step. In this guide we use [SSL For Free](https://sslforfree.com) to generate a free ZeroSSL certificate.

1. Go to [sslforfree.com](https://sslforfree.com), type in the name of your subdomain and click the "Create Free SSL Certificate" button.

    <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_1-1_Go_to_sslforfree.com.png" alt="Step_1-1_Go_to_sslforfree.com.png" width="700" />

2. In the dashboard, click the "New Certificate" button.

    <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_1-2_create_certificate.png" alt="Step_1-2_create_certificate.png" width="500" />

3. In the "New Certificate" dialog that appears there are four separate steps to complete.

    1. **Domains:** Enter the subdomain from the DNS record (and click the "Next Step" button).

        <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_1-3_new_certificate.png" alt="Step_1-3_new_certificate.png" width="500" />

    2. **Validity:** Choose 90 days validity.

    3. **CSR & Contact:** Select "Auto-generate CSR".

    4. **Finalize Your Order:** Select the free tier and click the "Next Step" button.

        <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_1-4_Finalize.png" alt="Step_1-4_Finalize.png" width="500" />

4. Now you need to verify the ownership of your domain. This will require you to add a CNAME record to your DNS. In this step we will illustrate how to do this by switching back-and-forth between SSL For Free and Route 53. Ensure you keep each of them open in a separate tab to enable easy copying and pasting between them.

    1. In the "Verify Domain" dialog that appeared after previous step, select the "DNS (CNAME)" option. This provides you with a CNAME record that you need to add to your DNS. Keep this dialog open and do not click the "Next Step" button before you have added the record to your DNS.

        <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_1-5_DNS_CNAME.png" alt="Step_1-5_DNS_CNAME.png" width="500" />

    2. Go to Route 53 and click the "Create record" button (just like you did when you added the DNS record).

    3. Select "Simple routing".

    4. In the "Define simple record" dialog:
    
        * Set "Record name" to the value from "Name" in the "Verify Domain" dialog in the SSL For Free tab.
        * Choose CNAME as record type
        * Choose "IP address or another value" under "Value/Route traffic to".
        * In the textbox under "IP address or another value" you paste the value from "Point To" in the "Verify Domain" dialog in the SSL For Free tab.
        * Finish the definition by clicking the "Define simple record" button.

        <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_1-6_CNAME_record.png" alt="Step_1-6_CNAME_record.png" width="400" />

    5. In the "Configure records" dialog that appears, create the record you have just defined by clicking the "Create records" button.

        <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_1-7_CNAME_record_created.png" alt="Step_1-7_CNAME_record_created.png" width="500" />

    6. Go back to the "Verify Domain" dialog in the SSL For Free tab and go to "Finalize" by clicking the "Next Step" button.

    7. Verify your subdomain by clicking the "Verify Domain" button. This will contact the domain and verify that it redirects to the right URL.

        <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_1-9_automatic_domain_verification.png" alt="Step_1-9_automatic_domain_verification.png" width="500" />

5. Now that you have verified your domain a "Install Certificate" dialog will appear. Here you download your certificate as a `.zip` file by selecting "Default Format" in the drop-down list and click the "Download Certificate (.zip)" button. The other steps in the dialog ("Install Certificate" and "Installation Complete") are not required.

    <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_1-10_verification_success_download_cert.png" alt="Step_1-10_verification_success_download_cert.png" width="500" />

    The `.zip` file should contain the following files:

    ```
    ca_bundle.crt
    certificate.crt
    private.key
    ```


### Step 3 - Configure SA Studio to use SSL

1. Copy the downloaded certificate `.zip` file to the machine that runs SA Studio.

2. Unzip it and put the files in `${SA_ENGINE_HOME}/visual_analyzer/webssl/`.

3. Update `sas_config.sh` to start SA Studio with HTTPS. This is done by replacing the existing call to `node index.js` near the bottom of the file from

    ```bash
    node index.js -csvoc=0 \
        -lisp='(trace open-socket open-socket-multiple)(cd (sa-home))(osql "_enable_slog_compiler(false);")' \
        -conStr=node@localhost -p=3001
    ```

    to

    ```bash
    node index.js -csvoc=0 \
        -ca=${SA_ENGINE_HOME}/visual_analyzer/webssl/ca_bundle.crt \
        -key=${SA_ENGINE_HOME}/visual_analyzer/webssl/private.key \
        -cert=${SA_ENGINE_HOME}/visual_analyzer/webssl/certificate.crt \
        -httpsPort=3002 \
        -lisp='(trace open-socket open-socket-multiple)(cd (sa-home))(osql "_enable_slog_compiler(false);")' \
        -conStr=node@localhost -p=3001
    ```

4. Open port 3002 in your firewall.

5. Restart the SA Studio service.

    ```bash
    sudo systemctl restart sa.studio.service
    ```


### Step 4 - Verify that you can access SA Studio through HTTPS

1. Open a browser and go to the URL `https://<your_subdomain>:3002`.

    <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_2-1_go_to_https_URL.png" alt="Step_2-1_go_to_https_URL.png" width="700" />

 
2. Check that the padlock next to the URL is locked and click it to check that the connection is secure and that the certificate is valid. In the screen shots we use Chrome, but any modern browser should show icons with similar functionality.

    <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_2-2_verify_security.png" alt="Step_2-2_verify_security.png" width="400" />
 
3. You can click on "Certificate is valid" to get more information about the certificate.

    <img src="https://s3.eu-north-1.amazonaws.com/assets.streamanalyze.com/sa-server-on-prem/Step_2-3_Certificate_information.png" alt="Step_2-3_Certificate_information.png" width="400" />


That is it, you now have access to SA Studio through HTTPS with a valid SSL certificate.

