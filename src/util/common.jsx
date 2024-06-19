
// 객체 useState 변경
export const objChnage = (
    value,
    key,
    setter
) => {
    setter(prev => ({ ...prev, [key]: value}));
};