'use client';
// import { useActionState } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { changePassword } from '@/actions/authActions';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/SubmitButton';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Eye, EyeOff } from 'lucide-react';

const initialState = {
  type: '',
  message: '',
  errors: null,
};

export default function ChangePasswordForm({ email }: { email: string }) {
  // const [state, submitAction, isPending] = useActionState(changePassword, initialState);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const changePasswordWithEmail = changePassword.bind(null, email as string);

  const [state, submitAction] = useFormState(
    changePasswordWithEmail,
    initialState,
  );

  const router = useRouter();
  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
      router.push('/dashboard/profile');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={submitAction} className='space-y-4'>
      {state.errors && (
        <div className='rounded-md border-2 border-red-400 px-2 py-4 text-center'>
          <p className='text-red-500'>{state.message}</p>
        </div>
      )}
      <div className='grid gap-2'>
        <Label htmlFor='oldPassword'>Current Password</Label>
        <div className='relative'>
          <Input
            id='oldPassword'
            name='oldPassword'
            placeholder='Your Current Password'
            required
            className='form-input block w-full px-3 py-2 placeholder-gray-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
            type={showCurrentPassword ? 'text' : 'password'}
          />
          <div
            className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? (
              <EyeOff className='h-5 w-5 text-gray-500' />
            ) : (
              <Eye className='h-5 w-5 text-gray-500' />
            )}
          </div>
        </div>
        {state.errors?.oldPassword && (
          <p className='text-red-500'>{state.errors.oldPassword}</p>
        )}
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='newPassword'>Password</Label>
        <div className='relative'>
          <Input
            id='newPassword'
            name='newPassword'
            placeholder='••••••••'
            required
            className='form-input block w-full px-3 py-2 placeholder-gray-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
            type={showPassword ? 'text' : 'password'}
          />
          <div
            className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className='h-5 w-5 text-gray-500' />
            ) : (
              <Eye className='h-5 w-5 text-gray-500' />
            )}
          </div>
        </div>
        {state.errors?.newPassword && (
          <p className='text-red-500'>{state.errors.newPassword}</p>
        )}
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='password2'>Password Confirmation</Label>
        <div className='relative'>
          <Input
            id='password2'
            name='password2'
            placeholder='••••••••'
            required
            className='form-input block w-full px-3 py-2 placeholder-gray-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
            type={showConfirmPassword ? 'text' : 'password'}
          />
          <div
            className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className='h-5 w-5 text-gray-500' />
            ) : (
              <Eye className='h-5 w-5 text-gray-500' />
            )}
          </div>
        </div>
        {state.errors?.password2 && (
          <p className='text-red-500'>{state.errors.password2}</p>
        )}
      </div>
      <SubmitButton text="Change Password" />
    </form>
  );
}