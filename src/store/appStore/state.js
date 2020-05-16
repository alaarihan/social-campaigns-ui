export default function() {
  return {
    page: {
      title: "Social Campaigns",
      name: "",
      settings: {
        popupEditing: false,
        filters: true,
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
              id: "status_duration_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "status_duration_lte",
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
              id: "credit_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "credit_lte",
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
    },
    campaigns: {
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
          name: "name",
          label: "Name",
          field: "name",
          align: "left",
          sortable: true,
          filter: { op: "_ilike" }
        },
        {
          name: "type",
          label: "Type",
          field: "type",
          align: "left",
          type: "badge",
          settings: { color: "grey" },
          filter: {
            type: "select",
            options: [
              { label: "All", value: null },
              "YOUTUBE_VIEWS",
              "YOUTUBE_LIKES",
              "YOUTUBE_COMMENTS",
              "YOUTUBE_SUBSCRIBES"
            ]
          },
          editor: {
            type: "select",
            options: [
              "YOUTUBE_VIEWS",
              "YOUTUBE_LIKES",
              "YOUTUBE_COMMENTS",
              "YOUTUBE_SUBSCRIBES"
            ]
          },
          sortable: true
        },
        {
          name: "target",
          required: false,
          label: "Target",
          field: "target",
          align: "left",
          filter: [
            {
              id: "target_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "target_lte",
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
          name: "cost_per_one",
          required: false,
          label: "Cost per One",
          field: "cost_per_one",
          align: "left",
          filter: [
            {
              id: "cost_per_one_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "cost_per_one_lte",
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
          name: "progress",
          required: false,
          label: "Progress",
          field: "progress",
          align: "left",
          filter: [
            {
              id: "progress_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "progress_lte",
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
              "ACTIVE",
              "PENDING",
              "COMPLETED",
              "RESTART",
              "CANCEL",
              "CANCELED"
            ]
          },
          editor: {
            type: "select",
            options: [
              "ACTIVE",
              "PENDING",
              "COMPLETED",
              "RESTART",
              "CANCEL",
              "CANCELED"
            ]
          },
          sortable: true
        },
        {
          name: "link",
          label: "Link",
          field: "link",
          align: "left",
          sortable: true,
          filter: { op: "_eq" }
        },
        {
          name: "repeat",
          required: false,
          label: "Repeat",
          field: "repeat",
          align: "left",
          filter: [
            {
              id: "repeat_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "repeat_lte",
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
          name: "repeated",
          required: false,
          label: "Repeated",
          field: "repeated",
          align: "left",
          filter: [
            {
              id: "repeated_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "repeated_lte",
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
          name: "overwrite",
          label: "Overwrite",
          field: "overwrite",
          align: "left",
          type: "badge",
          settings: { color: "grey" },
          filter: {
            type: "select",
            options: [{ label: "All", value: null }, "yes", "no"]
          },
          editor: {
            type: "select",
            options: ["yes", "no"]
          },
          sortable: true
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
          actions: ["edit"],
          sortable: true
        }
      ]
    }
  };
}
