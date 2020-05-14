export default function() {
  return {
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
          sortable: true
        },
        {
          name: "message",
          label: "Message",
          field: "message",
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
          settings: { color: "green" },
          filter: {
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
          sortable: false
        },
        {
          name: "created",
          label: "Created",
          field: "created_at",
          align: "left",
          type: "timeago",
          settings: { autoUpdate: false },
          sortable: true
        }
      ]
    }
  };
}
