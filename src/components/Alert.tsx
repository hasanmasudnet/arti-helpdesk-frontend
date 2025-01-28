import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function Alert({
  title,
  message,
  onConfirm,
  isDialogOpen,
  setIsDialogOpen,
}) {
  return (
    <AlertDialog.Root open={isDialogOpen}>
      <AlertDialog.Trigger asChild>
        {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Delete Item
        </button> */}
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

        <AlertDialog.Content className="fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6">
          <AlertDialog.Title className="text-xl md:text-2xl font-bold text-black">
            Are you sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-gray-600">
            This action cannot be undone. This will permanently delete the item.
          </AlertDialog.Description>

          <div className="mt-4 flex justify-end space-x-4">
            <AlertDialog.Cancel asChild>
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => {
                  onConfirm();
                  setIsDialogOpen(false);
                }}
              >
                Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
