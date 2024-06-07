// import { useActionState } from 'react';
import { deleteAccount } from '@/actions/authActions'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { SubmitButton } from '@/components/SubmitButton'
import { cn } from '@/lib/utils'

export default function DeleteAccount({
  userId,
  className
}: { userId: string, className?: string }) {
  // const [state, submitAction, isPending] = useActionState(deleteAccount, initialState);
  const deleteAccountWithEmail = deleteAccount.bind(null, userId as string)

  return (
    <div className={cn('m-4 flex flex-col justify-between gap-2 px-4', className)}>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='sm' variant='destructive'>
            Delete Account
          </Button>
        </DialogTrigger>
        <DialogContent className='w-4/5 sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Account Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account?
            </DialogDescription>
          </DialogHeader>
          <div className='flex items-center space-x-2'>
            <p className='text-gray-500 dark:text-gray-400'>
              Once you delete your account, there is no going back. Please be
              certain. Deleting account will also delete Oauth accounts if you
              have it.
            </p>
          </div>
          <DialogFooter className='gap-2 sm:justify-end'>
            <DialogClose asChild>
              <Button size='sm' variant='outline'>
                Close
              </Button>
            </DialogClose>
            <form action={deleteAccountWithEmail}>
              <SubmitButton
                text="Delete Account"
              />
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}