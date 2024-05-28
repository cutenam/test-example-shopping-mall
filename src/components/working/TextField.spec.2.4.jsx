import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField.jsx';
import render from '@/utils/test/render.jsx';

/**
 * 2.4. React Testing Library와 컴포넌트 테스트
 * (1) 이벤트 핸들러 검증
 */

it('className prop으로 설정한 css class 가 적용된다.', async () => {
  // 1. Arrange 단계
  await render(<TextField className="my-class"/>);

  // 2. Act 단계
  // 3. Assert 단계
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  screen.debug();

  // 4. 결과 확인
  expect(textInput).toHaveClass('my-class');
});

describe('placeholder 테스트', () =>{
  it('기본 placeholder "텍스트를 입력해 주세요." 가 표시된다.', async () => {
    await render(<TextField />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    screen.debug();
    expect(textInput).toBeInTheDocument();
  });

  it('placeholder props 에 따라 placeholder 텍스트메시지가 변경된다.', async () => {
    await render(<TextField placeholder='상품명을 입력해주세요.'/>);
    const textInput = screen.getByPlaceholderText('상품명을 입력해주세요.');
    screen.debug();
    expect(textInput).toBeInTheDocument();
  });

  it('텍스트를 입력하면 onChange prop 으로 등록한 함수가 호출된다.', async () => {
    // 스파이함수 : 특정함수 호출 여부, 인자, 리턴값등 확인가능함, 콜백함수, 이벤트핸들러 검증시 이용
    const spy = vi.fn();
    // 이벤트 핸들러 검증을 위해 spy함수를 이용함
    const {user} =  await render(<TextField onChange={spy} />);
    // console.log(user);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    // 텍스트 입력 시뮬레이션
    await user.type(textInput, 'test');

    screen.debug();
    // spy 함수가 호출될 때, 'test'라는 인자가 전달되었는지 확인
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('엔터키를 입력하면 onEnter prop 으로 등록한 함수가 호출된다.', async () => {

    const spy = vi.fn();
    const {user} =  await render(<TextField onEnter={spy} />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    // {Enter} : 엔터키 입력에 대한 이벤트 명 전달
    await user.type(textInput, 'test{Enter}');

    screen.debug();
    // spy 함수가 호출될 때, 'test'라는 인자가 전달되었는지 확인
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('포커스가 활성화되면 onFocus prop 으로 등록한 함수가 호출된다.', async () => {
    const spy = vi.fn();
    const {user} = await render(<TextField onFocus={spy} />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    // 포커스 활성화 시뮬레이션
    // (1)tab 키로 input 요소로 이동했을 때
    // (2)input 요소를 마우스로 클릭했을 때
    // (3)input 요소에 foucs() 메서드를 호출했을 때

    // 클릭 api 이용
    await user.click(textInput);

    screen.debug();
    // spy 함수가 호출되었는지 확인
    expect(spy).toHaveBeenCalled();
  });

  it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
    const {user} = await render(<TextField/>);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.click(textInput);
    screen.debug();

    // toHaveStyle : style 내용을 확인할때 사용함
    expect(textInput).toHaveStyle({ borderWidth: '2px', borderColor: 'rgb(25, 118, 210)' });
  });
});

