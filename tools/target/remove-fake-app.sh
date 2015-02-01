#!/bin/sh

sqlite3 -batch /opt/dbspace/.app_info.db << EOF
DELETE FROM localname WHERE package = "node";
DELETE FROM app_info WHERE package = "node";
EOF

sqlite3 -batch /opt/dbspace/.pkgmgr_parser.db << EOF
DELETE FROM package_app_info WHERE app_id = "node";
DELETE FROM package_app_app_metadata WHERE app_id = "node";
DELETE FROM package_info WHERE package = "node";
EOF

rm -rf /opt/usr/apps/node

sqlite3 -batch /opt/dbspace/.sap.db << EOF
DELETE FROM sap_service WHERE pkg_id = "node";
DELETE FROM sap_channel WHERE agent_id = 12345;
EOF

sqlite3 -batch /opt/dbspace/.ace.db << EOF
DELETE FROM WidgetInfo WHERE app_id = 12345;
DELETE FROM AceAcceptedFeature WHERE app_id = 12345;
DELETE FROM AceRequestedDevCaps WHERE app_id = 12345;
DELETE FROM WidgetCertificateFingerprint WHERE app_id = 12345;
EOF

sqlite3 -batch /opt/dbspace/.wrt.db << EOF
DELETE FROM WidgetInfo WHERE app_id = 12345;
DELETE FROM WidgetFeature WHERE app_id = 12345;
EOF
