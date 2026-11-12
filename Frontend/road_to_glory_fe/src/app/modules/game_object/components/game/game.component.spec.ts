import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';

import { GameComponent } from './game.component';
import { GameObjectService } from '../../services/game_object.service';
import { CommunicationService } from 'src/app/modules/communication/services/communication.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { PersistenceService } from '../../services/persistence.service';
import { GameService } from '../../services/game.service';

// 20x20 board of 50px cells: guaranteed to overflow the board container in
// both directions, so the behaviour while scrolling can be tested.
const TERRAIN: string[][] = Array.from({ length: 20 }, () =>
  Array.from({ length: 20 }, () => 'plains')
);

const CITY = { x_coor: 0, y_coor: 0, health: 10, icon: 'city' };

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    const game_object_service = jasmine.createSpyObj('GameObjectService', [
      'createGame',
      'getTerrain',
      'nextTurn',
      'endGame',
    ]);
    game_object_service.createGame.and.returnValue(
      of({ first_player: 'first', second_player: 'second', first_city: CITY, second_city: CITY })
    );
    game_object_service.getTerrain.and.returnValue(of(TERRAIN));

    const communication_service = jasmine.createSpyObj('CommunicationService', [
      'getLeave',
      'getAttack',
      'getDestroy',
      'getDestroyCity',
      'getMove',
      'getProduceUnit',
      'getProduceFacility',
      'getNextTurn',
      'getEndGame',
      'getSurrendered',
      'sendNextTurn',
    ]);
    [
      'getLeave',
      'getAttack',
      'getDestroy',
      'getDestroyCity',
      'getMove',
      'getProduceUnit',
      'getProduceFacility',
      'getNextTurn',
      'getEndGame',
      'getSurrendered',
    ].forEach((method) => communication_service[method].and.returnValue(EMPTY));

    const persistence_service = jasmine.createSpyObj('PersistenceService', ['addStats']);
    persistence_service.addStats.and.returnValue(of(void 0));

    TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [
        GameService,
        { provide: GameObjectService, useValue: game_object_service },
        { provide: CommunicationService, useValue: communication_service },
        { provide: AuthService, useValue: { logged_in: new BehaviorSubject<boolean>(false) } },
        { provide: PersistenceService, useValue: persistence_service },
        { provide: Router, useValue: { navigate: () => Promise.resolve(true) } },
      ],
    });

    sessionStorage.setItem('username', 'first');
    sessionStorage.setItem('room_id', '1');
    sessionStorage.removeItem('token');

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the full board', () => {
    const cells = fixture.debugElement.queryAll(By.css('.board-cell'));
    expect(cells.length).toBe(20 * 20);
  });

  describe('while waiting for the opponent', () => {
    beforeEach(() => {
      component.my_turn = false;
      fixture.detectChanges();
    });

    it('shows the waiting badge anchored to the board, not to the scrolled content', () => {
      const overlay = fixture.debugElement.query(By.css('.turn-waiting-overlay'));
      expect(overlay).withContext('waiting badge is rendered').not.toBeNull();

      const style = window.getComputedStyle(overlay.nativeElement);
      // absolute inside the non-scrolling wrapper (a fixed/absolute child of
      // the scroll container itself would scroll away with the board)
      expect(style.position).toBe('absolute');
      // the badge only signals the state, it must not swallow clicks
      expect(style.pointerEvents).toBe('none');
    });

    it('keeps the waiting badge over the visible board when the board is scrolled', () => {
      const container = fixture.debugElement.query(By.css('.board-container')).nativeElement as HTMLElement;
      container.scrollTop = container.scrollHeight;
      container.scrollLeft = container.scrollWidth;
      expect(container.scrollTop).withContext('board must be scrollable').toBeGreaterThan(0);
      expect(container.scrollLeft).withContext('board must be scrollable').toBeGreaterThan(0);

      const overlay = fixture.debugElement.query(By.css('.turn-waiting-overlay')).nativeElement as HTMLElement;
      const badge = overlay.querySelector('.waiting-message') as HTMLElement;
      const overlay_rect = badge.getBoundingClientRect();
      const container_rect = container.getBoundingClientRect();

      // The badge has to stay inside the visible part of the container,
      // wherever the board is scrolled to.
      expect(overlay_rect.top).toBeGreaterThanOrEqual(container_rect.top);
      expect(overlay_rect.bottom).toBeLessThanOrEqual(container_rect.bottom);
      expect(overlay_rect.left).toBeGreaterThanOrEqual(container_rect.left);
      expect(overlay_rect.right).toBeLessThanOrEqual(container_rect.right);
    });

    it('softly blurs the whole board itself, not just a part of it', () => {
      const board = fixture.debugElement.query(By.css('.game-board'));
      expect(board.classes['not-my-turn']).toBe(true);

      const style = window.getComputedStyle(board.nativeElement);
      expect(style.filter).toBe('blur(1px)');
    });

    it('disables interaction with every cell', () => {
      const cells = fixture.debugElement.queryAll(By.css('.board-cell'));
      expect(cells.length).toBeGreaterThan(0);

      for (const cell of cells) {
        expect(cell.classes['disabled']).withContext('cell is disabled').toBe(true);
        expect(window.getComputedStyle(cell.nativeElement).pointerEvents).toBe('none');
      }
    });
  });

  describe('during the own turn', () => {
    it('shows no waiting badge and no blur', () => {
      component.my_turn = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.turn-waiting-overlay'))).toBeNull();

      const board = fixture.debugElement.query(By.css('.game-board'));
      expect(board.classes['not-my-turn']).toBeFalsy();
      expect(window.getComputedStyle(board.nativeElement).filter).toBe('none');

      const cell = fixture.debugElement.query(By.css('.board-cell'));
      expect(cell.classes['disabled']).toBeFalsy();
      expect(window.getComputedStyle(cell.nativeElement).pointerEvents).not.toBe('none');
    });
  });
});
