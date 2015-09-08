Name:          webapi-plugins
Version:       0.0.1
Release:       0
Summary:       Implementation of Web API plugins.
Source:        %{name}-%{version}.tar.gz
Group:         Development/Libraries
License:       Apache License, Version 2.0

# build requirements
BuildRequires: cmake
BuildRequires: pkgconfig(bundle)
BuildRequires: pkgconfig(dlog)
BuildRequires: pkgconfig(capi-message-port)
BuildRequires: pkgconfig(wrt-common-native)
BuildRequires: pkgconfig(capi-system-device)
BuildRequires: pkgconfig(capi-appfw-app-manager)
BuildRequires: pkgconfig(capi-appfw-package-manager)
BuildRequires: pkgconfig(pkgmgr)
BuildRequires: pkgconfig(pkgmgr-info)
BuildRequires: pkgconfig(capi-appfw-application)
BuildRequires: pkgconfig(glib-2.0)
BuildRequires: pkgconfig(capi-telephony)
BuildRequires: pkgconfig(capi-network-connection)
BuildRequires: pkgconfig(capi-system-info)
BuildRequires: pkgconfig(capi-system-runtime-info)
BuildRequires: pkgconfig(capi-system-sensor)
BuildRequires: pkgconfig(tapi)
BuildRequires: pkgconfig(capi-system-system-settings)
BuildRequires: pkgconfig(libxml-2.0)
BuildRequires: pkgconfig(vconf)
BuildRequires: pkgconfig(icu-i18n)
BuildRequires: pkgconfig(icu-io)
BuildRequires: pkgconfig(icu-le)
BuildRequires: pkgconfig(icu-lx)
BuildRequires: pkgconfig(icu-uc)
BuildRequires: pkgconfig(storage)
BuildRequires: pkgconfig(capi-network-bluetooth)
BuildRequires: pkgconfig(capi-network-wifi)

# install requirements
Requires: wrt-service


%description
Implementation of Web API plugins.


%prep
%setup -q

%build
MAJORVER=`echo %{version} | awk 'BEGIN {FS="."}{print $1}'`

export CFLAGS="$CFLAGS -DTIZEN_ENGINEER_MODE"
export CXXFLAGS="$CXXFLAGS -DTIZEN_ENGINEER_MODE"
export FFLAGS="$FFLAGS -DTIZEN_ENGINEER_MODE"

export LDFLAGS="$LDFLAGS -Wl,--rpath=/usr/lib -Wl,--hash-style=both -Wl,--as-needed"

mkdir -p cmake_build_tmp
cd cmake_build_tmp

cmake .. \
        -DCMAKE_INSTALL_PREFIX=/usr \
        -DCMAKE_BUILD_TYPE=%{?build_type:%build_type} \
        -DUSER_MODE_LOGE_ENABLED="ON"

make %{?jobs:-j%jobs}

%install
rm -rf %{buildroot}
mkdir -p %{buildroot}/usr/share/license
cp LICENSE %{buildroot}/usr/share/license/%{name}
cp LICENSE.bsd %{buildroot}/usr/share/license/%{name}

cd cmake_build_tmp
%make_install

%clean
rm -rf %{buildroot}

%post
/sbin/ldconfig

%postun -p /sbin/ldconfig

%files
%manifest webapi-plugin.manifest
%{_datadir}/license/%{name}
%{_libdir}/wrt-plugins/*
%{_libdir}/webapi-plugins/*
