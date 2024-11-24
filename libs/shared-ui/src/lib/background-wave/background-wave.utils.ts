export function GenerateWavePaths(
  colors: any,
  width: number,
  height: number
): any {
  const minWidth = 875
  const effectiveWidth = Math.max(width, minWidth)

  const scaleX = (x: number) => Math.floor((x / 875) * effectiveWidth)
  const scaleY = (y: number) => Math.floor((y / 700) * height)

  return [
    {
      path: `M0 ${scaleY(191)}L${scaleX(25)} ${scaleY(213.5)}C${scaleX(
        50
      )} ${scaleY(236)} ${scaleX(100)} ${scaleY(281)} ${scaleX(150)} ${scaleY(
        279.7
      )}C${scaleX(200)} ${scaleY(278.3)} ${scaleX(250)} ${scaleY(
        230.7
      )} ${scaleX(300)} ${scaleY(200.2)}C${scaleX(350)} ${scaleY(
        169.7
      )} ${scaleX(400)} ${scaleY(156.3)} ${scaleX(450)} ${scaleY(
        164.5
      )}C${scaleX(500)} ${scaleY(172.7)} ${scaleX(550)} ${scaleY(
        202.3
      )} ${scaleX(600)} ${scaleY(224.5)}C${scaleX(650)} ${scaleY(
        246.7
      )} ${scaleX(700)} ${scaleY(261.3)} ${scaleX(750)} ${scaleY(
        257.7
      )}C${scaleX(800)} ${scaleY(254)} ${scaleX(850)} ${scaleY(232)} ${scaleX(
        875
      )} ${scaleY(221)}L${width} ${scaleY(210)}L${width} ${height}L${
        width - scaleX(25)
      } ${height}C${width - scaleX(50)} ${height} ${
        width - scaleX(100)
      } ${height} ${width - scaleX(150)} ${height}C${
        width - scaleX(200)
      } ${height} ${width - scaleX(250)} ${height} ${
        width - scaleX(300)
      } ${height}C${width - scaleX(350)} ${height} ${
        width - scaleX(400)
      } ${height} ${width - scaleX(450)} ${height}C${
        width - scaleX(500)
      } ${height} ${width - scaleX(550)} ${height} ${
        width - scaleX(600)
      } ${height}C${width - scaleX(650)} ${height} ${
        width - scaleX(700)
      } ${height} ${width - scaleX(750)} ${height}C${
        width - scaleX(800)
      } ${height} ${width - scaleX(850)} ${height} ${
        width - scaleX(875)
      } ${height}L0 ${height}Z`,
      color: colors.w8,
    },
    {
      path: `M0 ${scaleY(220)}L${scaleX(25)} ${scaleY(235.5)}C${scaleX(
        50
      )} ${scaleY(251)} ${scaleX(100)} ${scaleY(282)} ${scaleX(150)} ${scaleY(
        289.7
      )}C${scaleX(200)} ${scaleY(297.3)} ${scaleX(250)} ${scaleY(
        281.7
      )} ${scaleX(300)} ${scaleY(266.2)}C${scaleX(350)} ${scaleY(
        250.7
      )} ${scaleX(400)} ${scaleY(235.3)} ${scaleX(450)} ${scaleY(
        238.5
      )}C${scaleX(500)} ${scaleY(241.7)} ${scaleX(550)} ${scaleY(
        263.3
      )} ${scaleX(600)} ${scaleY(277.5)}C${scaleX(650)} ${scaleY(
        291.7
      )} ${scaleX(700)} ${scaleY(298.3)} ${scaleX(750)} ${scaleY(
        292.7
      )}C${scaleX(800)} ${scaleY(287)} ${scaleX(850)} ${scaleY(269)} ${scaleX(
        875
      )} ${scaleY(260)}L${width} ${scaleY(251)}L${width} ${height}L${
        width - scaleX(25)
      } ${height}C${width - scaleX(50)} ${height} ${
        width - scaleX(100)
      } ${height} ${width - scaleX(150)} ${height}C${
        width - scaleX(200)
      } ${height} ${width - scaleX(250)} ${height} ${
        width - scaleX(300)
      } ${height}C${width - scaleX(350)} ${height} ${
        width - scaleX(400)
      } ${height} ${width - scaleX(450)} ${height}C${
        width - scaleX(500)
      } ${height} ${width - scaleX(550)} ${height} ${
        width - scaleX(600)
      } ${height}C${width - scaleX(650)} ${height} ${
        width - scaleX(700)
      } ${height} ${width - scaleX(750)} ${height}C${
        width - scaleX(800)
      } ${height} ${width - scaleX(850)} ${height} ${
        width - scaleX(875)
      } ${height}L0 ${height}Z`,
      color: colors.w7,
    },
    {
      path: `M0 ${scaleY(238)}L${scaleX(25)} ${scaleY(254.3)}C${scaleX(
        50
      )} ${scaleY(270.7)} ${scaleX(100)} ${scaleY(303.3)} ${scaleX(
        150
      )} ${scaleY(320)}C${scaleX(200)} ${scaleY(336.7)} ${scaleX(250)} ${scaleY(
        337.3
      )} ${scaleX(300)} ${scaleY(338.7)}C${scaleX(350)} ${scaleY(340)} ${scaleX(
        400
      )} ${scaleY(342)} ${scaleX(450)} ${scaleY(341)}C${scaleX(500)} ${scaleY(
        340
      )} ${scaleX(550)} ${scaleY(336)} ${scaleX(600)} ${scaleY(323)}C${scaleX(
        650
      )} ${scaleY(310)} ${scaleX(700)} ${scaleY(288)} ${scaleX(750)} ${scaleY(
        278.7
      )}C${scaleX(800)} ${scaleY(269.3)} ${scaleX(850)} ${scaleY(
        272.7
      )} ${scaleX(875)} ${scaleY(274.3)}L${width} ${scaleY(
        276
      )}L${width} ${height}L${width - scaleX(25)} ${height}C${
        width - scaleX(50)
      } ${height} ${width - scaleX(100)} ${height} ${
        width - scaleX(150)
      } ${height}C${width - scaleX(200)} ${height} ${
        width - scaleX(250)
      } ${height} ${width - scaleX(300)} ${height}C${
        width - scaleX(350)
      } ${height} ${width - scaleX(400)} ${height} ${
        width - scaleX(450)
      } ${height}C${width - scaleX(500)} ${height} ${
        width - scaleX(550)
      } ${height} ${width - scaleX(600)} ${height}C${
        width - scaleX(650)
      } ${height} ${width - scaleX(700)} ${height} ${
        width - scaleX(750)
      } ${height}C${width - scaleX(800)} ${height} ${
        width - scaleX(850)
      } ${height} ${width - scaleX(875)} ${height}L0 ${height}Z`,
      color: colors.w6,
    },
    {
      path: `M0 ${scaleY(287)}L${scaleX(25)} ${scaleY(308)}C${scaleX(
        50
      )} ${scaleY(329)} ${scaleX(100)} ${scaleY(371)} ${scaleX(150)} ${scaleY(
        369.2
      )}C${scaleX(200)} ${scaleY(367.3)} ${scaleX(250)} ${scaleY(
        321.7
      )} ${scaleX(300)} ${scaleY(319.3)}C${scaleX(350)} ${scaleY(317)} ${scaleX(
        400
      )} ${scaleY(358)} ${scaleX(450)} ${scaleY(367.5)}C${scaleX(500)} ${scaleY(
        377
      )} ${scaleX(550)} ${scaleY(355)} ${scaleX(600)} ${scaleY(337.8)}C${scaleX(
        650
      )} ${scaleY(320.7)} ${scaleX(700)} ${scaleY(308.3)} ${scaleX(
        750
      )} ${scaleY(307.3)}C${scaleX(800)} ${scaleY(306.3)} ${scaleX(
        850
      )} ${scaleY(316.7)} ${scaleX(875)} ${scaleY(321.8)}L${width} ${scaleY(
        327
      )}L${width} ${height}L${width - scaleX(25)} ${height}C${
        width - scaleX(50)
      } ${height} ${width - scaleX(100)} ${height} ${
        width - scaleX(150)
      } ${height}C${width - scaleX(200)} ${height} ${
        width - scaleX(250)
      } ${height} ${width - scaleX(300)} ${height}C${
        width - scaleX(350)
      } ${height} ${width - scaleX(400)} ${height} ${
        width - scaleX(450)
      } ${height}C${width - scaleX(500)} ${height} ${
        width - scaleX(550)
      } ${height} ${width - scaleX(600)} ${height}C${
        width - scaleX(650)
      } ${height} ${width - scaleX(700)} ${height} ${
        width - scaleX(750)
      } ${height}C${width - scaleX(800)} ${height} ${
        width - scaleX(850)
      } ${height} ${width - scaleX(875)} ${height}L0 ${height}Z`,
      color: colors.w5,
    },
    {
      path: `M0 ${scaleY(373)}L${scaleX(25)} ${scaleY(390.3)}C${scaleX(
        50
      )} ${scaleY(407.7)} ${scaleX(100)} ${scaleY(442.3)} ${scaleX(
        150
      )} ${scaleY(458)}C${scaleX(200)} ${scaleY(473.7)} ${scaleX(250)} ${scaleY(
        460.3
      )} ${scaleX(300)} ${scaleY(438.8)}C${scaleX(350)} ${scaleY(
        417.3
      )} ${scaleX(400)} ${scaleY(387.3)} ${scaleX(450)} ${scaleY(
        376.2
      )}C${scaleX(500)} ${scaleY(365)} ${scaleX(550)} ${scaleY(372.7)} ${scaleX(
        600
      )} ${scaleY(383.8)}C${scaleX(650)} ${scaleY(395)} ${scaleX(700)} ${scaleY(
        410
      )} ${scaleX(750)} ${scaleY(404.8)}C${scaleX(800)} ${scaleY(
        399.7
      )} ${scaleX(850)} ${scaleY(374.3)} ${scaleX(875)} ${scaleY(
        361.7
      )}L${width} ${scaleY(349)}L${width} ${height}L${
        width - scaleX(25)
      } ${height}C${width - scaleX(50)} ${height} ${
        width - scaleX(100)
      } ${height} ${width - scaleX(150)} ${height}C${
        width - scaleX(200)
      } ${height} ${width - scaleX(250)} ${height} ${
        width - scaleX(300)
      } ${height}C${width - scaleX(350)} ${height} ${
        width - scaleX(400)
      } ${height} ${width - scaleX(450)} ${height}C${
        width - scaleX(500)
      } ${height} ${width - scaleX(550)} ${height} ${
        width - scaleX(600)
      } ${height}C${width - scaleX(650)} ${height} ${
        width - scaleX(700)
      } ${height} ${width - scaleX(750)} ${height}C${
        width - scaleX(800)
      } ${height} ${width - scaleX(850)} ${height} ${
        width - scaleX(875)
      } ${height}L0 ${height}Z`,
      color: colors.w4,
    },
    {
      path: `M0 ${scaleY(452)}L${scaleX(25)} ${scaleY(454.8)}C${scaleX(
        50
      )} ${scaleY(457.7)} ${scaleX(100)} ${scaleY(463.3)} ${scaleX(
        150
      )} ${scaleY(469.3)}C${scaleX(200)} ${scaleY(475.3)} ${scaleX(
        250
      )} ${scaleY(481.7)} ${scaleX(300)} ${scaleY(480.8)}C${scaleX(
        350
      )} ${scaleY(480)} ${scaleX(400)} ${scaleY(472)} ${scaleX(450)} ${scaleY(
        465
      )}C${scaleX(500)} ${scaleY(458)} ${scaleX(550)} ${scaleY(452)} ${scaleX(
        600
      )} ${scaleY(444.3)}C${scaleX(650)} ${scaleY(436.7)} ${scaleX(
        700
      )} ${scaleY(427.3)} ${scaleX(750)} ${scaleY(433.8)}C${scaleX(
        800
      )} ${scaleY(440.3)} ${scaleX(850)} ${scaleY(462.7)} ${scaleX(
        875
      )} ${scaleY(473.8)}L${width} ${scaleY(485)}L${width} ${height}L${
        width - scaleX(25)
      } ${height}C${width - scaleX(50)} ${height} ${
        width - scaleX(100)
      } ${height} ${width - scaleX(150)} ${height}C${
        width - scaleX(200)
      } ${height} ${width - scaleX(250)} ${height} ${
        width - scaleX(300)
      } ${height}C${width - scaleX(350)} ${height} ${
        width - scaleX(400)
      } ${height} ${width - scaleX(450)} ${height}C${
        width - scaleX(500)
      } ${height} ${width - scaleX(550)} ${height} ${
        width - scaleX(600)
      } ${height}C${width - scaleX(650)} ${height} ${
        width - scaleX(700)
      } ${height} ${width - scaleX(750)} ${height}C${
        width - scaleX(800)
      } ${height} ${width - scaleX(850)} ${height} ${
        width - scaleX(875)
      } ${height}L0 ${height}Z`,
      color: colors.w3,
    },
    {
      path: `M0 ${scaleY(498)}L${scaleX(25)} ${scaleY(499.5)}C${scaleX(
        50
      )} ${scaleY(501)} ${scaleX(100)} ${scaleY(504)} ${scaleX(150)} ${scaleY(
        510.8
      )}C${scaleX(200)} ${scaleY(517.7)} ${scaleX(250)} ${scaleY(
        528.3
      )} ${scaleX(300)} ${scaleY(528.8)}C${scaleX(350)} ${scaleY(
        529.3
      )} ${scaleX(400)} ${scaleY(519.7)} ${scaleX(450)} ${scaleY(
        515.3
      )}C${scaleX(500)} ${scaleY(511)} ${scaleX(550)} ${scaleY(512)} ${scaleX(
        600
      )} ${scaleY(508.7)}C${scaleX(650)} ${scaleY(505.3)} ${scaleX(
        700
      )} ${scaleY(497.7)} ${scaleX(750)} ${scaleY(494.3)}C${scaleX(
        800
      )} ${scaleY(491)} ${scaleX(850)} ${scaleY(492)} ${scaleX(875)} ${scaleY(
        492.5
      )}L${width} ${scaleY(493)}L${width} ${height}L${
        width - scaleX(25)
      } ${height}C${width - scaleX(50)} ${height} ${
        width - scaleX(100)
      } ${height} ${width - scaleX(150)} ${height}C${
        width - scaleX(200)
      } ${height} ${width - scaleX(250)} ${height} ${
        width - scaleX(300)
      } ${height}C${width - scaleX(350)} ${height} ${
        width - scaleX(400)
      } ${height} ${width - scaleX(450)} ${height}C${
        width - scaleX(500)
      } ${height} ${width - scaleX(550)} ${height} ${
        width - scaleX(600)
      } ${height}C${width - scaleX(650)} ${height} ${
        width - scaleX(700)
      } ${height} ${width - scaleX(750)} ${height}C${
        width - scaleX(800)
      } ${height} ${width - scaleX(850)} ${height} ${
        width - scaleX(875)
      } ${height}L0 ${height}Z`,
      color: colors.w2,
    },
    {
      path: `M0 ${scaleY(565)}L${scaleX(25)} ${scaleY(572.5)}C${scaleX(
        50
      )} ${scaleY(580)} ${scaleX(100)} ${scaleY(595)} ${scaleX(150)} ${scaleY(
        594.2
      )}C${scaleX(200)} ${scaleY(593.3)} ${scaleX(250)} ${scaleY(
        576.7
      )} ${scaleX(300)} ${scaleY(567.8)}C${scaleX(350)} ${scaleY(559)} ${scaleX(
        400
      )} ${scaleY(558)} ${scaleX(450)} ${scaleY(556.7)}C${scaleX(500)} ${scaleY(
        555.3
      )} ${scaleX(550)} ${scaleY(554)} ${scaleX(600)} ${scaleY(552.5)}C${scaleX(
        650
      )} ${scaleY(551)} ${scaleX(700)} ${scaleY(549.5)} ${scaleX(750)} ${scaleY(
        552.2
      )}C${scaleX(800)} ${scaleY(554.9)} ${scaleX(850)} ${scaleY(
        561.3
      )} ${scaleX(875)} ${scaleY(564.5)}L${width} ${scaleY(
        567
      )}L${width} ${height}L${width - scaleX(25)} ${height}C${
        width - scaleX(50)
      } ${height} ${width - scaleX(100)} ${height} ${
        width - scaleX(150)
      } ${height}C${width - scaleX(200)} ${height} ${
        width - scaleX(250)
      } ${height} ${width - scaleX(300)} ${height}C${
        width - scaleX(350)
      } ${height} ${width - scaleX(400)} ${height} ${
        width - scaleX(450)
      } ${height}C${width - scaleX(500)} ${height} ${
        width - scaleX(550)
      } ${height} ${width - scaleX(600)} ${height}C${
        width - scaleX(650)
      } ${height} ${width - scaleX(700)} ${height} ${
        width - scaleX(750)
      } ${height}C${width - scaleX(800)} ${height} ${
        width - scaleX(850)
      } ${height} ${width - scaleX(875)} ${height}L0 ${height}Z`,
      color: colors.w1,
    },
  ]
}
