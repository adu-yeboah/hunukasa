import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Svg, { Path as SvgPath } from "react-native-svg";

import { Drawer } from "@/components/Drawer";
import { GhanaFlag, Lock as LockIcon, Trophy } from "@/components/icons";
import { Toast } from "@/components/Toast";
import { PathHeader } from "@/components/PathHeader";
import { PathNode } from "@/components/PathNode";
import type { Lang } from "@/lib/curriculum";
import { C, FONT } from "@/lib/theme";
import { PATH_W, activeSection, buildPath, courseStats, pathD } from "@/lib/path";
import { firstIncompleteLessonId, usePathProgress, useProgressStore } from "@/lib/progress";

/* Learning Paththe home screen. Composes PathHeader, the progress card,
   the winding stitched path (charcoal underlay + gold dash), section
   banners, nodes (PathNode) and the Drawer. Progress is real: the active
   node opens the first incomplete lesson of the active unit; completing
   lessons advances the path (persisted in lib/progress). */

export default function Learn() {
  const [lang, setLang] = useState<Lang>("twi");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const xp = useProgressStore((s) => s.xp);
  const completed = useProgressStore((s) => s.completed);
  const info = usePathProgress(lang);

  const { items, segments, totalH } = buildPath(lang, {
    doneUnits: info.doneUnits,
    activeIndex: info.activeIndex,
  });
  const stats = courseStats(lang, completed);
  const sec = activeSection(lang, info.activeIndex);
  const pct = Math.round((stats.doneLessons / stats.totalLessons) * 100);
  const activeLessonId = firstIncompleteLessonId(lang, info.activeIndex, completed);

  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />
      <PathHeader lang={lang} onMenu={() => setDrawerOpen(true)} xp={xp} streak={5} />

      <Text className="mt-3 px-5 text-2xl" style={{ color: C.charcoal, fontFamily: FONT.black }}>
        {sec.title}
      </Text>
      <Text className="px-5 text-sm opacity-60" style={{ color: C.charcoal, fontFamily: FONT.semi }}>
        {sec.subtitle}
      </Text>

      {/* course progress */}
      <View className="mx-5 mt-3 rounded-2xl border-2 bg-white px-4 py-2.5" style={{ borderColor: C.charcoal }}>
        <View className="flex-row items-center justify-between">
          <Text className="text-[11px] uppercase tracking-wider" style={{ color: C.charcoal, fontFamily: FONT.black }}>
            Course progress
          </Text>
          <Text className="text-[11px]" style={{ color: C.charcoal, fontFamily: FONT.black }}>
            {stats.doneLessons}/{stats.totalLessons} lessons · {pct}%
          </Text>
        </View>
        <View className="mt-1.5 h-2.5 overflow-hidden rounded-full" style={{ backgroundColor: "#e6dcc6", borderWidth: 1.5, borderColor: C.charcoal }}>
          <View className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: C.indigo }} />
        </View>
      </View>

      {/* the winding path */}
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={{ height: totalH, width: PATH_W, alignSelf: "center" }}>
          <Svg width={PATH_W} height={totalH} viewBox={`-130 0 ${PATH_W} ${totalH}`} style={{ position: "absolute", left: 0, top: 0 }}>
            {segments.map((seg, i) => (
              <SvgPath key={`seg-${i}`} d={pathD(seg)} fill="none" stroke="rgba(43,33,26,0.18)" strokeWidth={10} strokeLinecap="round" />
            ))}
            {segments.map((seg, i) => (
              <SvgPath key={`dash-${i}`} d={pathD(seg)} fill="none" stroke={C.gold} strokeWidth={4} strokeLinecap="round" strokeDasharray="2 14" />
            ))}
          </Svg>

          {items.map((it) => {
            if (it.kind === "header") {
              return (
                <View key={`h-${it.order}`} style={{ position: "absolute", left: 0, right: 0, top: it.y }}>
                  <View className="rounded-2xl border-2 px-3 py-2" style={{ backgroundColor: C.indigo, borderColor: C.charcoal }}>
                    <View className="flex-row items-center gap-1.5">
                      {[C.gold, C.terracotta, C.cream, C.gold].map((col, i) => (
                        <View key={i} style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: col }} />
                      ))}
                      <Text className="ml-1 text-sm" style={{ color: C.gold, fontFamily: FONT.black }}>
                        {it.title}
                      </Text>
                    </View>
                    <Text className="text-[11px]" style={{ color: C.cream, fontFamily: FONT.semi }}>
                      {it.subtitle}
                    </Text>
                  </View>
                </View>
              );
            }
            if (it.kind === "checkpoint") {
              const done = it.state === "done";
              return (
                <View key={`c-${it.order}`} style={{ position: "absolute", left: PATH_W / 2 - 88, top: it.y - 30, width: 176, alignItems: "center" }}>
                  <View style={{ width: 68, height: 73 }}>
                    <View style={{ position: "absolute", inset: 0, borderRadius: 36.5, backgroundColor: done ? C.charcoal : "#c9bda3" }} />
                    <View className="items-center justify-center" style={{ width: 68, height: 68, borderRadius: 34, backgroundColor: done ? C.gold : "#efe6d2", borderWidth: 2, borderColor: C.charcoal }}>
                      {done ? <Trophy size={34} /> : <LockIcon />}
                    </View>
                  </View>
                  <Text className="mt-1.5 text-center text-xs opacity-70" style={{ color: C.charcoal, fontFamily: FONT.bold }}>
                    {it.label}
                  </Text>
                </View>
              );
            }
            return (
              <PathNode
                key={`u-${it.order}`}
                item={it}
                onStart={
                  it.state === "active"
                    ? () => router.push({ pathname: "/lesson/[id]", params: { id: activeLessonId } })
                    : undefined
                }
              />
            );
          })}
        </View>
      </ScrollView>

      <Drawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Toast />
    </View>
  );
}
