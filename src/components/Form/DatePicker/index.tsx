import 'dayjs/locale/en';

import { DatePicker as OriginalDatePicker, Form } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import locale from 'antd/es/date-picker/locale/en_US';
import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useField } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';

export const OriginalDatePickerDayjs = generatePicker<Dayjs>(dayjsGenerateConfig);
import withFinalForm, { WithFinalFormProps } from '../withFinalForm';

const dateFormat = 'YYYY.MM.DD.';

type Props = WithFinalFormProps &
  RangePickerProps & {
    startField: string;
    endField: string;
  };

export const RangePicker = ({
  input: { id, name, onChange, ...inputProps },
  helperText,
  meta,
  label,
  startField,
  endField,
  onChange: onOriginalChange = () => undefined,
  ...rest
}: Props) => {
  const startError = useField(startField).meta.error;
  const endError = useField(endField).meta.error;

  const hasError = startError || endError;

  const startErrorMessage = (
    <FormattedMessage
      id="RangePicker.Start"
      defaultMessage="Kezdődátum: {error}"
      values={{ error: startError }}
    />
  );
  const endErrorMessage = (
    <FormattedMessage
      id="RangePicker.End"
      defaultMessage="Végdátum: {error}"
      values={{ error: endError }}
    />
  );

  const errorMessage = (
    <span>
      {startError && startErrorMessage}
      {startError && <br />}
      {endError && endErrorMessage}
    </span>
  );

  return (
    <Form.Item
      label={label}
      validateStatus={hasError && meta.touched ? 'error' : ''}
      help={meta.touched ? hasError && errorMessage : helperText || undefined}
      colon={false}
    >
      <OriginalDatePicker.RangePicker
        {..._.omit(inputProps, ['type', 'value'])}
        {...rest}
        id={id}
        name={name}
        value={[inputProps.value[0], inputProps.value[1]]}
        onChange={(dates) => {
          if (!dates) {
            onChange([]);
            onOriginalChange([] as any, ['', '']);
            return;
          }
          onOriginalChange([dates[0], dates[1]], ['', '']);
          onChange([dates[0], dates[1]]);
        }} // you cannot call method of undefined
        disabled={false}
      />
    </Form.Item>
  );
};

// dayjs.unix(values.birthDate).format('YYYY-MM-DD')
export const DatePicker = withFinalForm(({ value, onChange, ...rest }: any) => (
  <OriginalDatePickerDayjs
    locale={locale}
    format={dateFormat}
    value={value ? dayjs(value, 'YYYY-MM-DD') : null}
    onChange={(momentDate) =>
      onChange(momentDate?.startOf('day').add(2, 'hours').format('YYYY-MM-DD'))
    }
    {...rest}
  />
));

export const MonthPicker = withFinalForm(({ value, onChange, ...rest }: any) => (
  <OriginalDatePicker.MonthPicker
    value={value ? dayjs.unix(value) : null}
    onChange={(momentDate) => onChange(momentDate?.toISOString())}
    {...rest}
  />
));

export default DatePicker;
