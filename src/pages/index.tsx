import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import {
  EditDialog,
  EditDialogTrigger,
  EditDialogContent,
  EditDialogTitle,
  EditDialogClose,
} from '@/components/EditDialog'
import {
  DeleteDialog,
  DeleteDialogTrigger,
  DeleteDialogContent,
  DeleteDialogTitle,
  DeleteDialogCancel,
} from '@/components/DeleteAlertDialog'

export default function Home() {
  return (
    <main className="h-screen max-w-[800px] mx-auto">
      <header className="bg-primary h-20 flex items-center">
        <h1 className="text-[1.375rem] font-semibold leading-none text-white pl-9">
          CodeLeap Network
        </h1>
      </header>
      <div className="bg-white border border-gray-6 p-6">
        <form className="border border-gray-6 p-6 rounded-lg">
          <h2 className="text-xl font-semibold">What&apos;s on your mind?</h2>

          <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col">
              <label>Title</label>
              <input className="h-10 rounded-lg border border-gray-7 mt-2" />
            </div>

            <div className="flex flex-col">
              <label>Content</label>
              <textarea className="h-10 rounded-lg border border-gray-7 mt-2" />
            </div>
          </div>

          <button
            type="submit"
            className="flex ml-auto items-center h-10 px-9 rounded-lg bg-primary mt-6 text-white"
          >
            Create
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-6">
          <div className="border border-gray-6 rounded-lg overflow-hidden">
            <div className="bg-primary text-white p-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold">My First Post at CodeLeap Network!</h3>
              <div className="flex items-center gap-6">
                <DeleteDialog>
                  <DeleteDialogTrigger>
                    <TrashIcon width={24} height={24} />
                  </DeleteDialogTrigger>
                  <DeleteDialogContent>
                    <DeleteDialogTitle className="text-xl font-semibold">
                      Are you sure you want to delete this item?
                    </DeleteDialogTitle>
                    <div className="flex justify-end gap-4 mt-10">
                      <DeleteDialogCancel className="h-9 px-8 border border-gray-7 rounded-lg">
                        Cancel
                      </DeleteDialogCancel>
                      <button className="h-9 px-8 rounded-lg bg-red-500">Delete</button>
                    </div>
                  </DeleteDialogContent>
                </DeleteDialog>
                <EditDialog>
                  <EditDialogTrigger>
                    <Pencil2Icon width={24} height={24} />
                  </EditDialogTrigger>
                  <EditDialogContent>
                    <EditDialogTitle className="text-xl font-semibold">Edit item</EditDialogTitle>
                    <div className="flex flex-col gap-6 mt-6">
                      <div className="flex flex-col gap-2">
                        <label>Title</label>
                        <input className="h-10 border border-gray-7 text-sm rounded-lg px-2" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label>Content</label>
                        <textarea className="h-10 border border-gray-7 text-sm rounded-lg px-2" />
                      </div>
                      <div className="flex justify-end items-center gap-4">
                        <EditDialogClose className="h-9 px-8 border border-gray-7 rounded-lg">
                          Cancel
                        </EditDialogClose>
                        <button className="h-9 px-8 rounded-lg bg-green-500">Save</button>
                      </div>
                    </div>
                  </EditDialogContent>
                </EditDialog>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-gray-11">@Victor</p>
                <p className="text-lg text-gray-11">25 minutes ago</p>
              </div>
              <p>
                Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit.
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit
                scelerisque suscipit. Duis lobortis massa imperdiet quam. Aenean posuere, tortor sed
                cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus.
                Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
