import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export default async component => {
  // 클릭 등 사용자가 발생한 이벤트를 시뮬레이션할 수 있는 api 반환
  const user = userEvent.setup();

  return {
    user,
    ...render(component),
  };
};
