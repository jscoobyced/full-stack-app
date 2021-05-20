import dateUtil from "./dateUtil";

test('rgets current date', () => {
  const currentDate = dateUtil.getCurrentDate();
  expect(currentDate instanceof Date).toBeTruthy();
});
