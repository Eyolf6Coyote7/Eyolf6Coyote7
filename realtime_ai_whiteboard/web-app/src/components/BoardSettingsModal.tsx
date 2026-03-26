import { useState } from 'react';
import styles from './BoardSettingsModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  boardName?: string;
}

const COLORS = [
  '#3B82F6',
  '#22C55E',
  '#FACC15',
  '#EF4444',
  '#A855F7',
  '#F97316',
  '#EC4899',
  '#94A3B8',
];

const MEMBERS = [
  {
    name: 'Alex Rivera',
    email: 'alex@etherboard.com',
    role: 'Owner',
    avatar: null,
    badges: ['Host', 'Owner'],
  },
  { name: 'Sarah Chen', email: 'sarah.c@company.io', role: 'Editor', avatar: null },
  { name: 'James Doe', email: 'j.doe@agency.com', role: 'Viewer', avatar: 'JM', initials: true },
];

export function BoardSettingsModal({ isOpen, onClose, boardName = 'Product Brainstorm' }: Props) {
  const [name, setName] = useState(boardName);
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [visibility, setVisibility] = useState('team');
  const [guestLink, setGuestLink] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>Board Settings</span>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {/* General Section */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>General</span>
            <div className={styles.field}>
              <label className={styles.label}>Board Name</label>
              <input
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.textarea}
                placeholder="Enter board description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Board Color</label>
              <div className={styles.colorPicker}>
                {COLORS.map((color, i) => (
                  <button
                    key={color}
                    className={selectedColor === i ? styles.colorBtnActive : styles.colorBtn}
                    style={{ background: color, color }}
                    onClick={() => setSelectedColor(i)}
                  >
                    {selectedColor === i && (
                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                        <path
                          d="M1 4L4 7L10 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.separator} />

          {/* Sharing Section */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Sharing & Permissions</span>
            <div className={styles.field}>
              <label className={styles.label}>Board visibility</label>
              <select
                className={styles.select}
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option value="team">Team</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Invite members</label>
              <div className={styles.inviteRow}>
                <input
                  className={styles.input}
                  placeholder="Enter email..."
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <button className={styles.inviteButton}>Invite</button>
              </div>
            </div>
            <div className={styles.memberList}>
              {MEMBERS.map((m) => (
                <div key={m.email} className={styles.memberRow}>
                  <div className={styles.memberInfo}>
                    <div
                      className={styles.memberAvatar}
                      style={
                        m.initials
                          ? { background: '#E7E8E9' }
                          : { background: `url(${''})`, backgroundColor: '#E7E8E9' }
                      }
                    >
                      {m.avatar || m.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span className={styles.memberName}>{m.name}</span>
                        {m.badges?.map((b) => (
                          <span
                            key={b}
                            className={b === 'Host' ? styles.badgeHost : styles.badgeOwner}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                      <span className={styles.memberEmail}>{m.email}</span>
                    </div>
                  </div>
                  <span className={styles.memberRole}>{m.role}</span>
                </div>
              ))}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Guest link</label>
              <div className={styles.guestLinkRow}>
                <input
                  className={styles.guestLinkInput}
                  value="https://etherboard.app/b/pb-921-xyz"
                  readOnly
                />
                <button className={styles.copyButton}>Copy Link</button>
              </div>
            </div>
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>Allow guest editing</span>
              <button
                className={guestLink ? styles.toggleOn : styles.toggle}
                onClick={() => setGuestLink(!guestLink)}
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>
          </div>

          <div className={styles.separator} />

          {/* Danger Zone */}
          <div className={styles.dangerZone}>
            <div className={styles.dangerTitle}>
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                  d="M9 1L1 15H17L9 1Z"
                  stroke="#B6152E"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path d="M9 6V10" stroke="#B6152E" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="9" cy="13" r="0.75" fill="#B6152E" />
              </svg>
              Danger Zone
            </div>
            <div className={styles.dangerContent}>
              <span className={styles.dangerText}>
                Permanently delete this board and all its contents. This action cannot be undone.
              </span>
              <button className={styles.deleteButton}>
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                  <path
                    d="M1 3H11M4 3V2C4 1.44772 4.44772 1 5 1H7C7.55228 1 8 1.44772 8 2V3M2 3V12C2 12.5523 2.44772 13 3 13H9C9.55228 13 10 12.5523 10 12V3"
                    stroke="#B6152E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Delete Board
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveButton}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
