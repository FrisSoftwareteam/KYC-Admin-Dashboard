/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  FormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps,
  Text,
} from '@chakra-ui/react';
import { NumericFormat } from 'react-number-format';

type NumericInputProps = {
  formControlProps?: FormControlProps;
  formLabelProps?: FormLabelProps;
  inputProps?: InputProps;
  errorMessage?: string | undefined;
  warningMessage?: string | undefined;
  touched?: boolean | undefined;
  onValueChange: any;
};
export default function CurrencyInput(props: NumericInputProps) {
  return (
    <FormControl {...props.formControlProps}>
      <FormLabel
        requiredIndicator={<abbr title="required field"></abbr>}
        fontFamily={'body'}
        fontWeight={'500'}
        fontSize={'14px'}
        mb={{ base: '6px' }}
        color={'#828282'}
        {...props.formLabelProps}
      >
        {props.formControlProps?.label}
      </FormLabel>

      <NumericFormat
        thousandSeparator=","
        prefix="₦"
        onValueChange={props.onValueChange}
        // @ts-ignore
        value={props.inputProps?.value as number}
        customInput={Input}
        h={{ base: '2.5rem', md: '3rem' }}
        fontSize={'.8rem'}
        _placeholder={{ color: '#B6B6B6', fontSize: '.9rem' }}
        errorBorderColor="crimson"
        border={'1px solid #B6B6B6'}
        rounded={'.4rem'}
        {...props.inputProps}
      />
      {props?.errorMessage && props?.touched && (
        <Text fontSize={'12px'} color={'red'}>
          {props.errorMessage}
        </Text>
      )}
      {props?.warningMessage && (
        <Text fontSize={'12px'} color={'primary.800'}>
          {props.warningMessage}
        </Text>
      )}
    </FormControl>
  );
}
