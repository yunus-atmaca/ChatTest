import styles from './styles/overlayMenu';

import React, {FC, useMemo} from 'react';
import {Text, TouchableOpacity, Dimensions} from 'react-native';
import {Portal} from '@gorhom/portal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon, {IconNames} from '@/components/Icon';
import {useAppDispatch} from '@/hooks/stores';
import {deleteMessage, setEditMessage} from '@/stores/controllers/chat';

type Props = {
  pos: IElementPos;
  data: IMessage;
  onClickOutside: () => void;
};

enum MenuActions {
  DELETE = 'Delete',
  EDIT = 'Edit',
}

interface IItem {
  action: MenuActions;
  ic: IconNames;
  color?: string;
}

const ITEM_HEIGHT = 40;
const ITEM_WIDTH = 144;
const ITEM_PADDING = 12;

const {width} = Dimensions.get('screen');
const OverlayMenu: FC<Props> = ({data, pos, onClickOutside}) => {
  const isClient = data.sender === 'client';

  const {top} = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const items = useMemo<IItem[]>(() => {
    const menu: IItem[] = [];
    if (isClient)
      menu.push({action: MenuActions.EDIT, ic: 'Edit', color: 'black'});
    menu.push({action: MenuActions.DELETE, ic: 'Trash', color: 'red'});

    return menu;
  }, []);

  const menuPos = useMemo(() => {
    const menuHeight = items.length * ITEM_HEIGHT + ITEM_PADDING * 2;
    const {py, h} = pos;

    const x = !isClient ? 16 : width - ITEM_WIDTH - 16;
    let y = pos.py - 12 - menuHeight;

    if (py - menuHeight < top + 24) {
      y = pos.py + h + 12;
    }

    return {menuHeight, x, y};
  }, [items]);

  const onMenuAction = (action: MenuActions) => {
    switch (action) {
      case MenuActions.DELETE:
        dispatch(deleteMessage(data));
        break;
      case MenuActions.EDIT:
        dispatch(setEditMessage(data));
        break;

      default:
        break;
    }

    onClickOutside();
  };

  const {w, h, px, py} = pos;
  return (
    <Portal>
      <TouchableOpacity
        onPress={onClickOutside}
        activeOpacity={1}
        style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            {
              width: w,
              height: h,
              top: py,
              left: px,
            },
            styles.bubble,
          ]}>
          <Text style={{color: 'black'}}>{data.text}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: ITEM_PADDING,
            height: menuPos.menuHeight,
            backgroundColor: 'white',
            width: ITEM_WIDTH,
            position: 'absolute',
            left: menuPos.x,
            top: menuPos.y,
            borderRadius: 12,
          }}>
          {items.map((item, index) => {
            const {color, action, ic} = item;
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onMenuAction(action)}
                key={'item' + index}
                style={[styles.item, {height: ITEM_HEIGHT}]}>
                <Icon containerSize={20} color={color} name={ic} />
                <Text style={{color, marginStart: 8}}>{action}</Text>
              </TouchableOpacity>
            );
          })}
        </TouchableOpacity>
      </TouchableOpacity>
    </Portal>
  );
};

export default OverlayMenu;
