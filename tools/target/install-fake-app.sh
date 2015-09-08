#!/bin/sh

sqlite3 -batch /opt/dbspace/.app_info.db << EOF
INSERT INTO localname (package, locale, name, x_slp_pkgid) VALUES
("node", "ar_AE", "node", "node"),
("node", "ar_IL", "node", "node"),
("node", "as_IN", "node", "node"),
("node", "az_AZ", "node", "node"),
("node", "bg_BG", "node", "node"),
("node", "bn_IN", "node", "node"),
("node", "ca_ES", "node", "node"),
("node", "cs_CZ", "node", "node"),
("node", "da_DK", "node", "node"),
("node", "de_DE", "node", "node"),
("node", "de_AT", "node", "node"),
("node", "de_CH", "node", "node"),
("node", "el_GR", "node", "node"),
("node", "en_GB", "node", "node"),
("node", "en_PH", "node", "node"),
("node", "en_US", "node", "node"),
("node", "en_AU", "node", "node"),
("node", "en_CA", "node", "node"),
("node", "en_IE", "node", "node"),
("node", "en_NZ", "node", "node"),
("node", "en_ZA", "node", "node"),
("node", "es_ES", "node", "node"),
("node", "es_US", "node", "node"),
("node", "et_EE", "node", "node"),
("node", "eu_ES", "node", "node"),
("node", "fa_IR", "node", "node"),
("node", "fi_FI", "node", "node"),
("node", "tl_PH", "node", "node"),
("node", "fr_CA", "node", "node"),
("node", "fr_FR", "node", "node"),
("node", "fr_BE", "node", "node"),
("node", "fr_CH", "node", "node"),
("node", "ga_IE", "node", "node"),
("node", "gl_ES", "node", "node"),
("node", "gu_IN", "node", "node"),
("node", "he_IL", "node", "node"),
("node", "hi_IN", "node", "node"),
("node", "hr_HR", "node", "node"),
("node", "hu_HU", "node", "node"),
("node", "hy_AM", "node", "node"),
("node", "id_ID", "node", "node"),
("node", "is_IS", "node", "node"),
("node", "it_IT", "node", "node"),
("node", "ja_JP", "node", "node"),
("node", "ka_GE", "node", "node"),
("node", "kk_KZ", "node", "node"),
("node", "km_KH", "node", "node"),
("node", "kn_IN", "node", "node"),
("node", "ko_KR", "node", "node"),
("node", "lo_LA", "node", "node"),
("node", "lt_LT", "node", "node"),
("node", "lv_LV", "node", "node"),
("node", "mk_MK", "node", "node"),
("node", "ml_IN", "node", "node"),
("node", "mr_IN", "node", "node"),
("node", "ms_MY", "node", "node"),
("node", "my_MM", "node", "node"),
("node", "nb_NO", "node", "node"),
("node", "ne_NP", "node", "node"),
("node", "nl_BE", "node", "node"),
("node", "nl_NL", "node", "node"),
("node", "or_IN", "node", "node"),
("node", "pa_IN", "node", "node"),
("node", "pl_PL", "node", "node"),
("node", "pt_BR", "node", "node"),
("node", "pt_PT", "node", "node"),
("node", "ro_RO", "node", "node"),
("node", "ru_RU", "node", "node"),
("node", "si_LK", "node", "node"),
("node", "sk_SK", "node", "node"),
("node", "sl_SI", "node", "node"),
("node", "sq_AL", "node", "node"),
("node", "sr_RS", "node", "node"),
("node", "sv_SE", "node", "node"),
("node", "ta_IN", "node", "node"),
("node", "te_IN", "node", "node"),
("node", "th_TH", "node", "node"),
("node", "tr_TR", "node", "node"),
("node", "uk_UA", "node", "node"),
("node", "ur_PK", "node", "node"),
("node", "uz_UZ", "node", "node"),
("node", "vi_VN", "node", "node"),
("node", "zh_CN", "node", "node"),
("node", "zh_HK", "node", "node"),
("node", "zh_TW", "node", "node");
INSERT INTO app_info (package, exec, name, type, icon, categories, version, mimetype, x_slp_service, x_slp_packagetype, x_slp_packagecategories, x_slp_packageid, x_slp_uri, x_slp_svc, x_slp_exe_path, x_slp_appid, x_slp_pkgid, x_slp_domain, x_slp_submodemainid, x_slp_installedstorage, x_slp_baselayoutwidth, x_slp_installedtime, nodisplay, x_slp_taskmanage, x_slp_multiple, x_slp_removable, x_slp_ishorizontalscale, x_slp_enabled, x_slp_submode, desktop) VALUES
("node", "/opt/usr/apps/node/bin/node", "node", "Application", "", "", "0.0.1", "", "", "rpm", "", "node", "", "", "node", "node", "node", "", "", "installed_internal", 0, 1393915938, 1, 0, 0, 0, 0, 1, 0, "/usr/share/applications/node.desktop");
EOF

sqlite3 -batch /opt/dbspace/.pkgmgr_parser.db << EOF
INSERT INTO package_app_info (app_id, app_component, app_exec, app_nodisplay, app_type, app_onboot, app_multiple, app_autorestart, app_taskmanage, app_enabled, app_hwacceleration, app_screenreader, app_mainapp, app_recentimage, app_launchcondition, app_indicatordisplay, app_portraitimg, app_landscapeimg, app_guestmodevisibility, app_permissiontype, app_preload, app_submode, app_submode_mainid, app_installed_storage, app_process_pool, component_type, package, app_reserve1, app_reserve2, app_reserve3, app_reserve4, app_reserve5) VALUES
("node", "uiapp", "node", "true", "capp", "false", "false", "false", "false", "true", "use-system-setting", "use-system-setting", "true", "", "false", "true", "", "", "true", "normal", "True", "false", "", "installed_internal", "false", "uiapp", "node", "", "", "", "", "");
INSERT INTO package_app_app_metadata (app_id, md_key, md_value) VALUES
("node", "AccessoryServicesLocation", "sap.xml");
INSERT INTO package_info (package, package_type, package_version, install_location, package_size, package_removable, package_preload, package_readonly, package_update, package_appsetting, package_nodisplay, package_system, author_name, author_email, author_href,installed_time, installed_storage, storeclient_id, mainapp_id, package_url, root_path, csc_path, package_reserve1, package_reserve2, package_reserve3, package_reserve4, package_reserve5) VALUES
("node", "rpm", "0.0.1", "internal-only", "", "False", "true", "True", "False", "false", "false", "True", "node", "node", "www.samsung.com", "1393915942", "installed_internal", "", "node", "", "/opt/usr/apps/node", "", "", "", "", "", "");
EOF

mkdir -p /opt/usr/apps/node/res/wgt
mkdir -p /opt/usr/apps/node/bin
ln -s /usr/bin/wrt-client /opt/usr/apps/node/bin/node

cat > /opt/usr/apps/node/res/wgt/sap.xml << EOF
<resources>
    <application name = "my application">
        <serviceProfile
            role="consumer"
            name="music"
            id="/system/music"
            serviceLimit="any"
            serviceTimeout="200"
            version="2.0">
            <supportedTransports>
                <transport type="TRANSPORT_BT"/>
            </supportedTransports>
            <serviceChannel
                id="100"
                dataRate="high"
                priority="low"
                reliability="enable" />
        </serviceProfile>
    </application>
</resources>
EOF

cat > /opt/usr/apps/node/res/wgt/index.js << EOF
module.exports.onStart = function () {
    console.log("Service - onStart");
};
module.exports.onService = function () {
    console.log("Service - onService");
};
module.exports.onExit = function () {
    console.log("Service - onExit");
};
EOF

# smack
DEV_MODEL=`sed -n '/^Model/ { s/.*=// ; s/;// ; s/\r//; p }' /etc/info.ini | tr -d \\\r`
echo "Device model: $DEV_MODEL"

if [ "$DEV_MODEL" == "SM-Z9005" ]
then
    echo "Changing SMACK properties for files"

    chsmack -a "_" /opt/usr/apps/node
    chsmack -a "_" /opt/usr/apps/node/res
    chsmack -a "_" /opt/usr/apps/node/res/wgt
    chsmack -a "_" /opt/usr/apps/node/res/wgt/sap.xml
    chsmack -a "_" /opt/usr/apps/node/res/wgt/index.js

    for f in /opt/dbspace/.*.db; do chsmack -a "_" $f; done
    for f in /opt/dbspace/.*.db-journal; do chsmack -a "_" $f; done

    chsmack -a "_" /opt/var/kdb/db/menu_widget/language
    chsmack -a "_" /run/memory/sysman/battery_capacity
    chsmack -a "_" /run/memory/sysman/charge_now
    chsmack -a "_" /opt/var/kdb/db/setting/Brightness
    chsmack -a "_" /opt/var/kdb/db/setting/auto_rotate_screen
fi

if [ -f /usr/bin/smack-policy-gen ]
then
    echo "Generating SMACK rules for sdbd"

    echo "sdbd all.rule include" > /etc/smack/accesses2.d/sdbd-temp.rule
    pushd /etc/smack/accesses2.d > /dev/null
    /usr/bin/smack-policy-gen sdbd-temp.rule
    /usr/bin/smackload /etc/smack/accesses.d/sdbd-temp.efl
    popd > /dev/null
fi

sqlite3 -batch /opt/dbspace/.sap.db << EOF
INSERT INTO sap_service (pkg_id, app_id, ale_id, asp_id, asp_name, role, service_impl,transport_type, version, service_limit, service_timeout, launch_on_attach, agent_id) VALUES
("node", "node", 11111, "/system/music", "music", 1, "node", 4, "0.0.1", 0, 200, 0, 12345);
INSERT INTO sap_channel (agent_id, channel_id, payload_type, qos_reliability, qos_priority, qos_datarate)
SELECT 12345, "100", 0, 5, 0, 1 WHERE NOT EXISTS(SELECT 1 FROM sap_channel WHERE agent_id = 12345);
EOF

# WRT Security

sqlite3 -batch /opt/dbspace/.ace.db << EOF
INSERT INTO WidgetInfo (app_id, widget_type, widget_id, widget_version, author_name, share_href) VALUES
(12345, 2, "http://yourdomain/node", "0.0.1", "", "");
INSERT INTO AceAcceptedFeature (app_id, feature) VALUES
(12345, "http://tizen.org/privilege/application.launch"),
(12345, "http://tizen.org/privilege/application.kill"),
(12345, "http://tizen.org/privilege/appmanager.kill"),
(12345, "http://tizen.org/privilege/appmanager.certificate"),
(12345, "http://tizen.org/privilege/application.info"),
(12345, "http://tizen.org/privilege/filesystem.read"),
(12345, "http://tizen.org/privilege/filesystem.write"),
(12345, "http://tizen.org/privilege/healthinfo"),
(12345, "http://tizen.org/privilege/medicalinfo");
INSERT INTO AceRequestedDevCaps (app_id, grant_smack, dev_cap) VALUES
(12345, 1, "application.launch"),
(12345, 1, "appmanager.kill"),
(12345, 1, "appmanager.certificate"),
(12345, 1, "application.info"),
(12345, 1, "filesystem.read"),
(12345, 1, "filesystem.write"),
(12345, 1, "healthinfo"),
(12345, 1, "medicalinfo");
INSERT INTO WidgetCertificateFingerprint (app_id, owner, chainid, type, md5_fingerprint, sha1_fingerprint, common_name) VALUES
(12345, 1, 1, 0, "md5 0F:4A:84:97:89:D0:DE:F2:9C:38:81:02:6C:10:0C:F8", "sha-1 67:37:DE:B7:B9:9D:D2:DB:A5:2C:42:DE:CB:2F:2C:3E:33:97:E1:85", "Tizen Partner Distributor Root CA"),
(12345, 1, 1, 1, "md5 AA:2B:92:EE:4B:B2:BA:AB:9F:08:14:BB:52:29:B6:FD", "sha-1 7D:07:72:C3:2D:2B:B4:AC:23:B8:5D:BA:1B:56:9A:4A:84:2E:ED:F6", "Tizen Partner Distributor Signer"),
(12345, 0, -1, 0, "md5 14:B5:C4:CA:2D:4B:5F:E0:57:E2:03:F2:3D:B5:5B:D0", "sha-1 D4:C0:91:D8:DE:C4:16:D2:44:0E:AA:B6:E4:CD:F8:AD:6A:F4:36:4C", "Tizen Developers Root"),
(12345, 0, -1, 1, "md5 15:D7:DF:C5:F0:16:98:08:C5:10:C0:C1:68:88:DC:7E", "sha-1 E8:38:C1:CC:F3:3E:44:AB:E1:F7:7E:B2:6D:D2:EC:43:DB:56:C0:C5", "author");
EOF

sqlite3 -batch /opt/dbspace/.wrt.db << EOF
INSERT INTO WidgetInfo (app_id, widget_type, widget_id, widget_version, webkit_plugins_required, wac_signed, min_version, back_supported, access_network, tizen_pkgid, tizen_appid, pkg_type, security_model_version) VALUES
(12345, 1, "http://yourdomain/node", "0.0.1", 0, 0, "2.2", 0, 0, "node", "node", 1, 0);
INSERT INTO WidgetFeature (app_id, name, rejected) VALUES
(12345, "http://tizen.org/privilege/application.launch", 0),
(12345, "http://tizen.org/privilege/application.kill", 0),
(12345, "http://tizen.org/privilege/appmanager.kill", 0),
(12345, "http://tizen.org/privilege/appmanager.certificate", 0),
(12345, "http://tizen.org/privilege/application.info", 0),
(12345, "http://tizen.org/privilege/filesystem.read", 0),
(12345, "http://tizen.org/privilege/filesystem.write", 0),
(12345, "http://tizen.org/privilege/healthinfo", 0),
(12345, "http://tizen.org/privilege/medicalinfo", 0);
EOF
