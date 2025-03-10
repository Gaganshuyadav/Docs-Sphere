// permissions.d.ts
interface PermissionName {
    "clipboard-write": "clipboard-write";
    "clipboard-read": "clipboard-read";
}

//  extend the existing PermissionName type
declare global {
    interface PermissionName {
        "clipboard-write": "clipboard-write";
        "clipboard-read": "clipboard-read";
    }
}