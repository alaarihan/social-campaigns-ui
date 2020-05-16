export default function() {
  return {
    page: {
      title: "Social Campaigns",
      name: "",
      settings: {
        popupEditing: false,
        bulkActions: true,
        rowActions: true
      }
    },
    logs: {
      columns: [
        {
          name: "id",
          required: true,
          label: "#",
          field: "id",
          align: "left",
          filter: [
            {
              id: "id_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "id_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "message",
          label: "Message",
          field: "message",
          align: "left",
          sortable: true,
          filter: { op: "_ilike" },
          editor: {
            type: "textarea"
          }
        },
        {
          name: "type",
          label: "Type",
          field: "type",
          align: "left",
          type: "badge",
          settings: { color: "green" },
          filter: {
            type: "select",
            options: [{ label: "All", value: null }, "INFO", "ERROR"]
          },
          editor: {
            type: "select",
            options: ["INFO", "ERROR"]
          },
          sortable: true
        },
        {
          name: "account",
          label: "Account",
          field: "account",
          align: "left",
          editor: false,
          sortable: false
        },
        {
          name: "host_name",
          label: "Host",
          field: "host_name",
          align: "left",
          type: "text",
          filter: { op: "_eq" },
          sortable: true
        },
        {
          name: "created",
          label: "Created",
          field: "created_at",
          align: "left",
          type: "timeago",
          settings: { autoUpdate: false },
          sortable: true
        },
        {
          name: "actions",
          label: "#",
          field: "id",
          align: "left",
          type: "actions",
          actions: ["edit", "delete"],
          sortable: true
        }
      ]
    },
    accounts: {
      columns: [
        {
          name: "id",
          required: true,
          label: "#",
          field: "id",
          align: "left",
          filter: [
            {
              id: "id_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "id_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "username",
          label: "User Name",
          field: "username",
          align: "left",
          sortable: true,
          filter: { op: "_eq" }
        },
        {
          name: "password",
          label: "Password",
          field: "password",
          align: "left",
          sortable: true,
          filter: { op: "_eq" }
        },
        {
          name: "email",
          label: "Email",
          field: "email",
          align: "left",
          sortable: true,
          filter: { op: "_eq" }
        },
        {
          name: "status",
          label: "Status",
          field: "status",
          align: "left",
          type: "badge",
          settings: { color: "grey" },
          filter: {
            type: "select",
            options: [
              { label: "All", value: null },
              "OFFLINE",
              "ONLINE",
              "DONE",
              "BLOCKED",
              "SUSPENDED",
              "YV_SUSPENDED"
            ]
          },
          editor: {
            type: "select",
            options: [
              "OFFLINE",
              "ONLINE",
              "DONE",
              "BLOCKED",
              "SUSPENDED",
              "YV_SUSPENDED"
            ]
          },
          sortable: true
        },
        {
          name: "status_duration",
          required: false,
          label: "Status Duration",
          field: "status_duration",
          align: "left",
          filter: [
            {
              id: "id_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "id_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "credit",
          required: false,
          label: "Credit",
          field: "credit",
          align: "left",
          filter: [
            {
              id: "id_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "id_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "last_activity",
          label: "Last Activity",
          field: "last_activity",
          align: "left",
          type: "timeago",
          settings: { autoUpdate: false },
          sortable: true
        },
        {
          name: "notes",
          label: "Notes",
          field: "notes",
          align: "left",
          sortable: true,
          filter: { op: "_ilike" },
          editor: {
            type: "textarea"
          }
        },
        {
          name: "created_at",
          label: "Created",
          field: "created_at",
          align: "left",
          type: "timeago",
          settings: { autoUpdate: false },
          sortable: true
        },
        {
          name: "updated_at",
          label: "Updated",
          field: "updated_at",
          align: "left",
          type: "timeago",
          settings: { autoUpdate: false },
          sortable: true
        },
        {
          name: "actions",
          label: "#",
          field: "id",
          align: "left",
          type: "actions",
          actions: ["edit", "delete"],
          sortable: true
        }
      ]
    }
  };
}
