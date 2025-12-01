import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import Papa from 'papaparse';
import { useToast } from '@/hooks/useToast';
import { IdentitybulkUpload } from '../types/verifications/bulk-upload';
import { useUploadBulkFile } from '../api/upload-bulk-file';
import { useCreateBulkVerificationApi } from '../api/verifications/create-bulk-verification';

export const useBulkUploadHook = () => {
  const [data, setData] = useState<any>([]);
  const [verificationType, setVerificationnType] = useState<string>('identity');
  const { mutateAsync: UBFapi, isLoading: UBFloading } = useUploadBulkFile();
  const { mutateAsync: UCBFapi, isLoading: UCBFloading } =
    useCreateBulkVerificationApi();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const toast = useToast();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      setFile(selectedFile);
      parseCSV(selectedFile);
    }
  };
  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        if (verificationType === 'identity') {
          const arr: Array<Partial<IdentitybulkUpload>> = results.data.map(
            (item: any) => ({
              firstName: item.candidateFirstName,
              lastName: item.candidateLastName,
              email: item.candidateEmail,
              middleName: item.candidateMiddleName,
              dateOfBirth: item.dateOfBirth,
              identityNumber: item.identityNumber,
              identityType: item.identityType,
            })
          );
          setData(arr);
        } else if (verificationType === 'address') {
          setData(results.data);
        }
      },
      error: function () {
        toast({ description: 'rror parsing CSV', status: 'error' });
      },
    });
  };
  const resetInputRef = () => {
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the input value
      //   inputRef.current = null; // Reset the ref to null
    }
  };

  const cancleUpload = () => {
    setData([]);
    setFile(undefined);
    resetInputRef();
  };
  const changeVerificationType = (value: string) => {
    setVerificationnType(value);
    cancleUpload();
  };
  const submitVerification = async (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append('file', file as any);
    const res = await UBFapi(form);
    const url = res.data.url;
    await UCBFapi({
      url,
      verificationType,
    });
    cancleUpload();

    // console.log('file is', file);
    // console.log('verification is is', verificationType);
  };
  return {
    file,
    setFile,
    inputRef,
    data,
    onChange,
    verificationType,
    setVerificationnType,
    changeVerificationType,
    cancleUpload,
    submitVerification,
    isLoading: UCBFloading || UBFloading,
  };
};
