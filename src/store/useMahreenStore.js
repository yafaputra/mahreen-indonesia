import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import badgesData from '@/data/badges.json';
import programsData from '@/data/programs.json';
import quizData from '@/data/quiz-questions.json';

export const useMahreenStore = create(
  persist(
    (set, get) => ({
      // AUTHENTICATION & USER PROFILE
      isAuthenticated: false, // Default to guest so Login and Register buttons are shown
      currentUser: null,
      registeredUsers: [
        {
          id: 'usr-demo-01',
          name: 'Ksatria Muda',
          email: 'ksatria@mahreen.id',
          password: 'password123',
          role: 'Talenta Rekayasa & Kreatif',
          city: 'Yogyakarta',
          province: 'D.I. Yogyakarta',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          joinedDate: '2026-08-01',
        },
      ],

      // XP & BADGES
      totalXp: 0,
      unlockedBadgeIds: [],
      latestUnlockedBadge: null,

      // QUIZ & CHARACTER PROFILE
      quizCompleted: false,
      quizAnswers: {},
      characterProfile: null,
      dimensionScores: { kreatif: 0, teknologi: 0, bisnis: 0, sosial: 0 },

      // PROGRAM BOOKMARKS
      bookmarkedProgramIds: [],

      // KARYA REACTIONS & COMMENTS
      userReactions: {},
      customComments: {},

      // MAP EXPLORATION
      exploredPillarIds: [],

      // TAHAP 2: UMKM CONNECT PROPOSALS
      submittedProposals: [],

      // TAHAP 3: MENTORSHIP BOOKINGS
      bookedSessions: [],

      // TAHAP 4: FESTIVAL PASSES
      registeredFestivals: [],

      // BURSA GOTONG ROYONG
      joinedProjects: [],
      createdProjects: [],

      // NOTIFICATIONS
      notifications: [
        {
          id: 'notif-1',
          title: 'Selamat Datang di Mahreen OS',
          message: 'Mulai langkah kontribusimu dengan mengikuti Onboarding Quiz 4-Dimensi.',
          timestamp: new Date().toISOString(),
          read: false,
          type: 'system',
          link: '/quiz',
        },
        {
          id: 'notif-2',
          title: 'Bursa Gotong Royong Dibuka',
          message: 'Temukan rekan seperjuangan untuk proyek inovasi sosial & kriya Nusantara.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          read: false,
          type: 'collab',
          link: '/kolaborasi',
        },
        {
          id: 'notif-3',
          title: 'Paspor Digital Siap Diklaim',
          message: 'Kumpulkan lencana dan cetak sertifikat kontribusi resmi pemudamu.',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          read: false,
          type: 'passport',
          link: '/paspor',
        },
      ],

      // ACTIVITY LOGS
      activityLogs: [
        {
          id: 'act-init',
          timestamp: new Date().toISOString(),
          title: 'Bergabung di Mahreen OS',
          description: 'Selamat datang di ekosistem Berkarya untuk Indonesia! Bonus sambutan pemuda.',
          xpEarned: 160,
          type: 'welcome',
        },
      ],

      // EKSPEDISI JEJAK KARYA
      completedExpeditions: [],

      // NOTIFICATIONS / TOAST
      activeToast: null,

      // TOAST ACTIONS
      showToast: (message, type = 'info') => {
        set({ activeToast: { message, type, id: Date.now() } });
      },
      clearToast: () => set({ activeToast: null }),
      dismissLatestBadge: () => set({ latestUnlockedBadge: null }),

      // AUTH ACTIONS
      login: (email, password) => {
        const state = get();
        // Check registered users or default to demo user
        const user = state.registeredUsers.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        ) || {
          id: `usr-${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: 'Talenta Pemuda',
          city: 'Nusantara',
          province: 'Indonesia',
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
          joinedDate: new Date().toISOString().split('T')[0],
        };

        const baseBonus = user.id === 'usr-demo-01' ? Math.max(state.totalXp, 160) : state.totalXp;
        set({
          isAuthenticated: true,
          currentUser: user,
          totalXp: baseBonus + 30,
        });

        get().addActivityLog('Masuk ke Sistem', `Selamat datang kembali, ${user.name}!`, 0, 'auth');
        get().showToast(`Selamat datang kembali, ${user.name}!`, 'success');
        get().checkBadgesUnlock();
        return true;
      },

      register: (userData) => {
        const newUser = {
          id: `usr-${Date.now()}`,
          name: userData.name || 'Pemuda Penggerak',
          email: userData.email,
          password: userData.password || 'password123',
          role: userData.role || 'Talenta Kreatif',
          city: userData.city || 'Yogyakarta',
          province: userData.province || 'D.I. Yogyakarta',
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${userData.name || 'pemuda'}`,
          joinedDate: new Date().toISOString().split('T')[0],
        };

        set((state) => ({
          isAuthenticated: true,
          currentUser: newUser,
          registeredUsers: [...state.registeredUsers, newUser],
          totalXp: state.totalXp + 50,
        }));

        get().addActivityLog('Pendaftaran Akun Berhasil', `Akun baru dibuat untuk ${newUser.name}.`, 0, 'auth');
        get().showToast(`Akun berhasil dibuat! Selamat bergabung, ${newUser.name}!`, 'success');
        get().checkBadgesUnlock();
        return true;
      },

      logout: () => {
        set({
          isAuthenticated: false,
          currentUser: null,
        });
        get().showToast('Kamu telah keluar dari akun Mahreen OS.', 'info');
      },

      addXp: (amount, reason) => {
        set((state) => ({ totalXp: state.totalXp + amount }));
        get().checkBadgesUnlock();
      },

      addActivityLog: (title, description, xpEarned = 0, type = 'general') => {
        const newLog = {
          id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          timestamp: new Date().toISOString(),
          title,
          description,
          xpEarned,
          type,
        };
        set((state) => ({
          activityLogs: [newLog, ...state.activityLogs].slice(0, 50),
        }));
      },

      // QUIZ ACTIONS
      submitQuiz: (answers, scores) => {
        let dominant = 'kreatif';
        let maxVal = -1;
        Object.entries(scores).forEach(([dim, val]) => {
          if (val > maxVal) {
            maxVal = val;
            dominant = dim;
          }
        });

        const dimToProfile = {
          teknologi: 'inovator_daerah',
          bisnis: 'penggerak_umkm',
          kreatif: 'kreator_digital',
          sosial: 'penggerak_sosial',
        };

        const profileKey = dimToProfile[dominant] || 'kreator_digital';
        const profile = quizData.profiles[profileKey];

        const alreadyCompleted = get().quizCompleted;
        const xpBonus = alreadyCompleted ? 15 : 60;

        set((state) => ({
          quizCompleted: true,
          quizAnswers: answers,
          characterProfile: profile,
          dimensionScores: scores,
          totalXp: state.totalXp + xpBonus,
        }));

        get().addActivityLog(
          'Menyelesaikan Onboarding Quiz',
          `Menemukan Profil Karakter: ${profile.title}`,
          xpBonus,
          'quiz'
        );

        get().checkBadgesUnlock();
        get().showToast(`Profil "${profile.title}" aktif!`, 'success');
      },

      retakeQuiz: () => {
        set({
          quizCompleted: false,
          quizAnswers: {},
        });
        get().showToast('Kuis direset. Silakan isi kembali untuk mengeksplorasi potensi!', 'info');
      },

      // EKSPEDISI ACTIONS
      completeExpedition: (expeditionResult) => {
        const bonusXp = 75;
        const newRecord = {
          id: `exp-${Date.now()}`,
          date: new Date().toISOString(),
          persona: expeditionResult.persona,
          title: expeditionResult.title,
          totalScore: expeditionResult.totalScore,
          impactBreakdown: expeditionResult.impactBreakdown,
          xpEarned: bonusXp,
        };

        set((state) => ({
          completedExpeditions: [newRecord, ...state.completedExpeditions],
          totalXp: state.totalXp + bonusXp,
        }));

        get().addActivityLog(
          'Menyelesaikan Ekspedisi Jejak Karya',
          `Meraih gelar kehormatan "${expeditionResult.title}" dengan total skor dampak ${expeditionResult.totalScore}!`,
          0,
          'game'
        );

        get().showToast(`Ekspedisi Selesai! Gelar Juang: ${expeditionResult.title}`, 'success');
        get().checkBadgesUnlock();
      },

      // PROGRAM BOOKMARK ACTIONS
      toggleBookmark: (programId) => {
        const state = get();
        const isBookmarked = state.bookmarkedProgramIds.includes(programId);
        const prog = programsData.find((p) => p.id === programId);
        const progTitle = prog ? prog.title : 'Program';

        if (isBookmarked) {
          set({
            bookmarkedProgramIds: state.bookmarkedProgramIds.filter((id) => id !== programId),
          });
          get().showToast(`Dihapus dari daftar minat: ${progTitle}`, 'info');
        } else {
          set({
            bookmarkedProgramIds: [...state.bookmarkedProgramIds, programId],
            totalXp: state.totalXp + 20,
          });
          get().addActivityLog(
            'Menandai Program',
            `Menyimpan minat pada program "${progTitle}"`,
            0,
            'bookmark'
          );
          get().showToast(`Program berhasil disimpan ke penanda!`, 'success');
          get().checkBadgesUnlock();
        }
      },

      getScheduleConflicts: () => {
        const { bookmarkedProgramIds } = get();
        const bookmarked = programsData.filter((p) => bookmarkedProgramIds.includes(p.id));
        const conflicts = [];

        for (let i = 0; i < bookmarked.length; i++) {
          for (let j = i + 1; j < bookmarked.length; j++) {
            const p1 = bookmarked[i];
            const p2 = bookmarked[j];
            const start1 = new Date(p1.startDate);
            const end1 = new Date(p1.endDate);
            const start2 = new Date(p2.startDate);
            const end2 = new Date(p2.endDate);

            if (start1 <= end2 && start2 <= end1) {
              conflicts.push({
                programA: p1,
                programB: p2,
                reason: `Jadwal bertabrakan: ${p1.startDate} s/d ${p1.endDate} dan ${p2.startDate} s/d ${p2.endDate}`,
              });
            }
          }
        }
        return conflicts;
      },

      // KARYA REACTION ACTIONS
      toggleReaction: (karyaId, reactionType) => {
        const state = get();
        const currentReactions = state.userReactions[karyaId] || {
          apresiasi: false,
          inspiratif: false,
          keren: false,
        };

        const willBeActive = !currentReactions[reactionType];
        const newForKarya = {
          ...currentReactions,
          [reactionType]: willBeActive,
        };

        const xpChange = willBeActive ? 10 : 0;

        set({
          userReactions: {
            ...state.userReactions,
            [karyaId]: newForKarya,
          },
          totalXp: state.totalXp + xpChange,
        });

        if (willBeActive) {
          get().addActivityLog(
            'Memberikan Reaksi Karya',
            `Memberikan apresiasi "${reactionType}" pada karya anak bangsa.`,
            10,
            'reaction'
          );
          get().checkBadgesUnlock();
        }
      },

      addComment: (karyaId, content, authorName = 'Ksatria Muda') => {
        if (!content || !content.trim()) return;

        const newComment = {
          id: `comment-${Date.now()}`,
          author: get().currentUser?.name || authorName,
          avatar: get().currentUser?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${authorName}`,
          timestamp: new Date().toISOString(),
          content: content.trim(),
          replies: [],
        };

        const state = get();
        const existingForKarya = state.customComments[karyaId] || [];

        set({
          customComments: {
            ...state.customComments,
            [karyaId]: [newComment, ...existingForKarya],
          },
          totalXp: state.totalXp + 15,
        });

        get().addActivityLog(
          'Mengirim Komentar Karya',
          'Memberikan masukan konstruktif untuk karya anak bangsa.',
          0,
          'comment'
        );
        get().showToast('Komentar berhasil dipublikasikan!', 'success');
        get().checkBadgesUnlock();
      },

      addReply: (karyaId, parentCommentId, content, authorName = 'Ksatria Muda') => {
        if (!content || !content.trim()) return;

        const newReply = {
          id: `reply-${Date.now()}`,
          author: get().currentUser?.name || authorName,
          avatar: get().currentUser?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${authorName}`,
          timestamp: new Date().toISOString(),
          content: content.trim(),
        };

        const state = get();
        const existingForKarya = state.customComments[karyaId] || [];

        const updatedComments = existingForKarya.map((item) => {
          if (item.id === parentCommentId) {
            return {
              ...item,
              replies: [...(item.replies || []), newReply],
            };
          }
          return item;
        });

        set({
          customComments: {
            ...state.customComments,
            [karyaId]: updatedComments,
          },
          totalXp: state.totalXp + 10,
        });

        get().addActivityLog(
          'Membalas Diskusi Karya',
          'Berinteraksi dalam diskusi pertukaran gagasan.',
          0,
          'reply'
        );
        get().showToast('Balasan terkirim!', 'success');
        get().checkBadgesUnlock();
      },

      markPillarExplored: (pillarId) => {
        const state = get();
        if (!state.exploredPillarIds.includes(pillarId)) {
          const updated = [...state.exploredPillarIds, pillarId];
          set({
            exploredPillarIds: updated,
            totalXp: state.totalXp + 15,
          });
          get().addActivityLog(
            'Mengeksplorasi Pilar Mahreen',
            `Mempelajari pilar ${pillarId.toUpperCase()} di Mahreen Map.`,
            15,
            'map'
          );
          get().checkBadgesUnlock();
        }
      },

      // TAHAP 2: UMKM CONNECT ACTIONS
      submitProposal: (briefId, proposalData) => {
        const newProposal = {
          id: `prop-${Date.now()}`,
          briefId,
          ...proposalData,
          applicantName: get().currentUser?.name || 'Ksatria Muda',
          timestamp: new Date().toISOString(),
          status: 'Menunggu Review UMKM',
        };

        set((state) => ({
          submittedProposals: [newProposal, ...state.submittedProposals],
          totalXp: state.totalXp + 25,
        }));

        get().addActivityLog(
          'Mengajukan Proposal UMKM Connect',
          `Mengajukan solusi gotong-royong untuk ${proposalData.umkmName}.`,
          0,
          'umkm'
        );
        get().showToast('Proposal kolaborasi terkirim!', 'success');
        get().checkBadgesUnlock();
      },

      // TAHAP 3: MENTORSHIP ACTIONS
      bookMentorSession: (mentorId, sessionData) => {
        const newSession = {
          id: `sess-${Date.now()}`,
          mentorId,
          ...sessionData,
          menteeName: get().currentUser?.name || 'Ksatria Muda',
          timestamp: new Date().toISOString(),
          status: 'Terkonfirmasi (Jadwal Terjadwal)',
        };

        set((state) => ({
          bookedSessions: [newSession, ...state.bookedSessions],
          totalXp: state.totalXp + 20,
        }));

        get().addActivityLog(
          'Booking Sesi Mentorship 1-on-1',
          `Sesi konsultasi privat bersama ${sessionData.mentorName} berhasil dijadwalkan.`,
          0,
          'mentorship'
        );
        get().showToast(`Sesi konsultasi bersama ${sessionData.mentorName} terkonfirmasi!`, 'success');
        get().checkBadgesUnlock();
      },

      // TAHAP 4: FESTIVAL PASS ACTIONS
      registerFestivalPass: (zoneId, zoneName) => {
        const passCode = `MH-FEST-${Math.floor(100000 + Math.random() * 900000)}`;
        const newPass = {
          id: `pass-${Date.now()}`,
          zoneId,
          zoneName,
          passCode,
          holderName: get().currentUser?.name || 'Ksatria Muda',
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          registeredFestivals: [newPass, ...state.registeredFestivals],
          totalXp: state.totalXp + 35,
        }));

        get().addActivityLog(
          'Mengklaim Pass Festival Nusantara',
          `Pass delegasi digital diterbitkan untuk ${zoneName} (${passCode}).`,
          0,
          'festival'
        );
        get().showToast(`E-Pass ${zoneName} berhasil diklaim! Kode: ${passCode}`, 'success');
        get().checkBadgesUnlock();
        return passCode;
      },

      // BADGES EVALUATION
      checkBadgesUnlock: () => {
        const state = get();
        const {
          quizCompleted,
          bookmarkedProgramIds,
          userReactions,
          customComments,
          exploredPillarIds,
          totalXp,
          unlockedBadgeIds,
        } = state;

        let reactionCount = 0;
        Object.values(userReactions).forEach((rx) => {
          if (rx.apresiasi) reactionCount++;
          if (rx.inspiratif) reactionCount++;
          if (rx.keren) reactionCount++;
        });

        let commentCount = 0;
        Object.values(customComments).forEach((cmList) => {
          commentCount += cmList.length;
          cmList.forEach((c) => {
            commentCount += (c.replies || []).length;
          });
        });

        const totalInteractions = reactionCount + commentCount;

        badgesData.forEach((badge) => {
          if (unlockedBadgeIds.includes(badge.id)) return;

          let qualifies = false;
          if (badge.criteria.type === 'quiz_completed' && quizCompleted) {
            qualifies = true;
          } else if (
            badge.criteria.type === 'bookmarks_count' &&
            bookmarkedProgramIds.length >= badge.criteria.value
          ) {
            qualifies = true;
          } else if (
            badge.criteria.type === 'interactions_count' &&
            totalInteractions >= badge.criteria.value
          ) {
            qualifies = true;
          } else if (
            badge.criteria.type === 'pillars_explored' &&
            exploredPillarIds.length >= badge.criteria.value
          ) {
            qualifies = true;
          } else if (
            badge.criteria.type === 'total_xp' &&
            totalXp >= badge.criteria.value
          ) {
            qualifies = true;
          }

          if (qualifies) {
            set((prev) => ({
              unlockedBadgeIds: [...prev.unlockedBadgeIds, badge.id],
              latestUnlockedBadge: badge,
              totalXp: prev.totalXp + badge.xpReward,
            }));

            get().addActivityLog(
              `Lencana Terbuka: ${badge.name}`,
              `Selamat! Kamu meraih lencana kategori ${badge.tier}.`,
              badge.xpReward,
              'badge_unlocked'
            );
          }
        });
      },

      // BURSA GOTONG ROYONG ACTIONS
      joinProject: (projectId, role, note) => {
        const state = get();
        const newJoin = {
          id: `join-${Date.now()}`,
          projectId,
          role,
          note,
          applicantName: state.currentUser?.name || 'Ksatria Muda',
          status: 'Menunggu Persetujuan Tim',
          joinedAt: new Date().toISOString(),
        };

        const newNotif = {
          id: `notif-${Date.now()}`,
          title: 'Aplikasi Kolaborasi Terkirim',
          message: `Kamu telah mengajukan diri sebagai ${role} pada inisiatif gotong royong.`,
          timestamp: new Date().toISOString(),
          read: false,
          type: 'collab',
          link: '/kolaborasi',
        };

        set((s) => ({
          joinedProjects: [...s.joinedProjects, newJoin],
          totalXp: s.totalXp + 20,
          notifications: [newNotif, ...s.notifications],
        }));

        get().addActivityLog(
          'Bergabung Tim Gotong Royong',
          `Mengajukan diri sebagai ${role} pada proyek kolaborasi.`,
          0,
          'collab'
        );
        get().showToast(`Aplikasi bergabung sebagai ${role} terkirim!`, 'success');
        get().checkBadgesUnlock();
        return true;
      },

      createProject: (projectData) => {
        const state = get();
        const newProj = {
          id: `collab-usr-${Date.now()}`,
          ...projectData,
          initiator: {
            name: state.currentUser?.name || 'Inisiator Muda',
            role: state.currentUser?.role || 'Penggerak Inisiatif',
            avatar: state.currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          },
          progress: 15,
          applicantsCount: 0,
          coverImage: projectData.coverImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        };

        const newNotif = {
          id: `notif-${Date.now()}`,
          title: 'Gagasan Proyek Terpublikasi',
          message: `Inisiatif "${newProj.title}" kini aktif di Bursa Gotong Royong.`,
          timestamp: new Date().toISOString(),
          read: false,
          type: 'collab',
          link: '/kolaborasi',
        };

        set((s) => ({
          createdProjects: [newProj, ...s.createdProjects],
          totalXp: s.totalXp + 35,
          notifications: [newNotif, ...s.notifications],
        }));

        get().addActivityLog(
          'Mempublikasikan Inisiatif Baru',
          `Membuat inisiatif gotong royong: ${newProj.title}.`,
          0,
          'collab'
        );
        get().showToast(`Gagasan berhasil dipublikasikan!`, 'success');
        get().checkBadgesUnlock();
        return newProj;
      },

      // NOTIFICATIONS ACTIONS
      markNotificationAsRead: (id) => {
        set((s) => ({
          notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        }));
      },

      markAllNotificationsAsRead: () => {
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      // RESET
      resetAllData: () => {
        set({
          totalXp: 0,
          unlockedBadgeIds: [],
          latestUnlockedBadge: null,
          quizCompleted: false,
          quizAnswers: {},
          characterProfile: null,
          dimensionScores: { kreatif: 0, teknologi: 0, bisnis: 0, sosial: 0 },
          bookmarkedProgramIds: [],
          userReactions: {},
          customComments: {},
          exploredPillarIds: [],
          submittedProposals: [],
          bookedSessions: [],
          registeredFestivals: [],
          joinedProjects: [],
          createdProjects: [],
          notifications: [],
          activityLogs: [
            {
              id: 'act-reset',
              timestamp: new Date().toISOString(),
              title: 'Reset Selesai',
              description: 'Data simulasi telah di-reset ke nilai awal.',
              xpEarned: 0,
              type: 'welcome',
            },
          ],
        });
        get().showToast('Seluruh data simulasi berhasil di-reset!', 'info');
      },
    }),
    {
      name: 'mahreen_os_storage_v4',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : null)),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        registeredUsers: state.registeredUsers,
        totalXp: state.totalXp,
        unlockedBadgeIds: state.unlockedBadgeIds,
        quizCompleted: state.quizCompleted,
        quizAnswers: state.quizAnswers,
        characterProfile: state.characterProfile,
        dimensionScores: state.dimensionScores,
        bookmarkedProgramIds: state.bookmarkedProgramIds,
        userReactions: state.userReactions,
        customComments: state.customComments,
        exploredPillarIds: state.exploredPillarIds,
        submittedProposals: state.submittedProposals,
        bookedSessions: state.bookedSessions,
        registeredFestivals: state.registeredFestivals,
        joinedProjects: state.joinedProjects,
        createdProjects: state.createdProjects,
        notifications: state.notifications,
        activityLogs: state.activityLogs,
      }),
    }
  )
);
