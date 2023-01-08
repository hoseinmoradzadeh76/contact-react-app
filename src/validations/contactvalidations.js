import *as YUP from 'yup';
export const contactSchema = YUP.object().shape({
    fullname: YUP.string().required('نام ونام خانوادگی الزامی می باشد'),
    photo: YUP.string().url('ادرس معتبر نیست').required('تصویر شما الزامی می باشد'),
    mobile: YUP.number().required('شماره نلفن الزامی می باشد'),
    email: YUP.string().email('ایمیل معتبر نیست').required("ایمیل الزامی می باشد"),
    job: YUP.string().nullable(),//یعنی الزامی نیست
    group: YUP.string().required('انتخاب گروه الزامی می باشد')

});