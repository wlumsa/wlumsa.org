import Image from "next/image";

import logo from "@/logo.png";

export function AdminLogo() {
  return (
    <div className="wlumsa-admin-logo">
      <Image
        alt="WLUMSA"
        className="wlumsa-admin-logo__mark"
        height={56}
        priority
        src={logo}
        width={56}
      />
      <span className="wlumsa-admin-logo__text">
        <strong translate="no">WLUMSA</strong>
        <small>Content Admin</small>
      </span>
    </div>
  );
}

export function AdminIcon() {
  return (
    <Image
      alt="WLUMSA"
      className="wlumsa-admin-icon"
      height={36}
      priority
      src={logo}
      width={36}
    />
  );
}
