import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { FC } from "react";
import { ItemInterface } from "react-sortablejs";

//Used to populate selected with the education names on first component load
interface props {
  CV: CV;
  order?: ItemInterface[];
}

Font.register({
  family: "Lora",
  src: "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787weuyJGmKxemMeZ.ttf",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787wsuyJGmKxemMeZ.ttf",
      fontWeight: 500,
    },
    {
      src: "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787zAvCJGmKxemMeZ.ttf",
      fontWeight: 600,
    },
    {
      src: "http://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-MoFkqh8ndeZzZ0.ttf",
      fontStyle: "italic",
    },
  ],
});

let FormalCV: FC<props> = ({ CV, order }) => {
  const pdfstyles = StyleSheet.create({
    page: {
      flexDirection: "row",
    },
    title: {
      fontSize: 40,
      fontFamily: "Lora",
      color: "darkblue",
      textAlign: "center",
      justifyContent: "center",
      marginHorizontal: "auto",
    },
    sectionTitle: {
      fontSize: 15,
      fontFamily: "Lora",
      marginLeft: "10px",
      backgroundColor: "lightgray",
      color: "black",
      marginRight: "20px",
      paddingVertical: "10px",
      marginTop: "10px",
    },
    regText: {
      fontSize: 10,
      fontFamily: "Lora",
      maxWidth: "60vw",
      textOverflow: "ellipsis",
      marginLeft: "10px",
      marginTop: "10px",
      paddingRight: "10px",
    },
    italicRegText: {
      fontSize: 8,
      fontFamily: "Lora",
      fontStyle: "italic",
      maxWidth: "60vw",
      textOverflow: "ellipsis",
      marginLeft: "10px",
      marginTop: "10px",
      paddingRight: "10px",
    },
    regTextRight: {
      fontSize: 10,
      fontFamily: "Lora",
      maxWidth: "60vw",
      textOverflow: "ellipsis",
      marginLeft: "10px",
      marginTop: "10px",
      paddingRight: "10px",
      textAlign: "right",
    },
    subtitle: {
      fontWeight: "bold",
      color: "black",
      fontSize: 15,
      textAlign: "center",
      fontFamily: "Lora",
      marginTop: "30px",
      marginLeft: "30px",
      marginRight: "30px",
    },
    subsubtitle: {
      fontWeight: "bold",
      fontSize: 10,
      textAlign: "center",
      fontFamily: "Lora",
      marginTop: "10px",
      marginHorizontal: "auto",
    },
    bigRegText: {
      fontSize: 20,
      margin: 20,
      fontFamily: "Lora",
    },
    view: {
      backgroundColor: "lightblue",
      color: "black",
      maxWidth: "40%",
    },
    whiteview: {
      marginHorizontal: "10px",
      marginVertical: "5px",
      padding: "10px",
    },
    flexrowview: {
      flexDirection: "row",
    },
    smallBlackIcon: {
      color: "black",
      width: "15px",
      height: "15px",
      marginTop: "10px",
      marginLeft: "10px",
    },
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //Format Dates
  function dateFormat(
    startDate: Date | string | null,
    endDate: Date | null | string
  ) {
    if (!startDate) {
      return "";
    }
    const startDateNew = new Date(startDate);

    return (
      months[startDateNew.getMonth()] +
      " " +
      startDateNew.getFullYear() +
      " - " +
      (endDate
        ? months[new Date(endDate).getMonth()] +
          " " +
          new Date(endDate).getFullYear()
        : "Present")
    );
  }

  //About Me Title
  const aboutmeTitle = CV.personalStatement ? (
    <Text style={pdfstyles.sectionTitle}>About Me</Text>
  ) : (
    ""
  );

  //Education Title
  const educationTitle =
    CV.education.length != 0 ? (
      <Text style={pdfstyles.sectionTitle}>Education</Text>
    ) : (
      ""
    );

  //Experience Title
  const experienceTitle =
    CV.experience.length != 0 ? (
      <Text style={pdfstyles.sectionTitle}>Experience</Text>
    ) : (
      ""
    );

  //Default Order (This doesn't appear in the other ones as it's automatically done as order isn't logically optionally)
  if (!order) {
    order = [
      { id: 1, name: "About Me" },
      { id: 2, name: "Education" },
      { id: 3, name: "Experience" },
    ];
  }

  //Content array with all of the CV Sections in it
  const content = [
    aboutmeTitle,
    <Text key={0} style={pdfstyles.regText}>
      {CV.personalStatement}
    </Text>,
    educationTitle,
    CV.education.map((each, i) => {
      return (
        <View key={i}>
          <View style={pdfstyles.flexrowview}>
            <Text style={pdfstyles.regText}>{each.name}</Text>
            <Text style={pdfstyles.regTextRight}>
              {dateFormat(each.startDate, each?.endDate)}
            </Text>
          </View>
          {each.degreeClassification != "" ? (
            <Text style={pdfstyles.italicRegText}>
              {each.degreeClassification}
            </Text>
          ) : (
            ""
          )}
          <Text style={pdfstyles.regText}>{each.description}</Text>
        </View>
      );
    }),
    experienceTitle,
    CV.experience.map((each, i) => {
      return (
        <View key={i}>
          <View style={pdfstyles.flexrowview}>
            <Text style={pdfstyles.regText}>
              {each.name + (each.jobTitle ? " - " + each.jobTitle : "")}
            </Text>
            <Text style={pdfstyles.regTextRight}>
              {dateFormat(each.startDate, each?.endDate)}
            </Text>
          </View>
          <Text style={pdfstyles.regText}>{each.description}</Text>
        </View>
      );
    }),
  ];

  //Renders left hand side as normal and then uses a maths function to get which order the other sections should be
  //E.g. 1 => 1,2 ; 2=>3,4 ; 3=>5,6 (used to get position of content in content array)
  return (
    <Document>
      <Page size="A4" style={pdfstyles.page}>
        <View style={pdfstyles.view}>
          {CV.email || CV.number ? (
            <View
              style={{
                backgroundColor: "white",
                marginVertical: "50px",
                marginHorizontal: "10px",
                borderRadius: "5px",
              }}
            >
              <Text style={pdfstyles.subtitle}>Contact Information</Text>
              <View style={pdfstyles.whiteview}>
                {CV.email != "" ? (
                  <Text style={pdfstyles.subsubtitle}>{" " + CV.email}</Text>
                ) : (
                  ""
                )}
                {CV.number != "" ? (
                  <Text style={pdfstyles.subsubtitle}>{CV.number}</Text>
                ) : (
                  ""
                )}
              </View>
            </View>
          ) : (
            ""
          )}
          {CV.qualities.length != 0 ? (
            <Text style={pdfstyles.sectionTitle}>Soft Skills</Text>
          ) : (
            ""
          )}
          {CV.qualities.map((each, i) => {
            return (
              <Text key={i} style={pdfstyles.regText}>
                {"\u2022 " + each}
              </Text>
            );
          })}

          {CV.skills.length != 0 ? (
            <Text style={pdfstyles.sectionTitle}>Hard Skills</Text>
          ) : (
            ""
          )}
          {CV.skills.map((each, i) => {
            return (
              <Text key={i} style={pdfstyles.regText}>
                {"\u2022 " + each}
              </Text>
            );
          })}

          {CV.refs.length != 0 ? (
            <Text style={pdfstyles.sectionTitle}>References</Text>
          ) : (
            ""
          )}
          {CV.refs.map((each, i) => {
            return (
              <View key={i}>
                <View style={pdfstyles.flexrowview}>
                  <Text style={pdfstyles.regText}>{each.refereeName}</Text>
                  <Text style={pdfstyles.regTextRight}>
                    {each.refereeContact}
                  </Text>
                </View>
                <Text style={pdfstyles.regText}>{each.reference}</Text>
              </View>
            );
          })}
        </View>
        <View>
          <>
            <Text style={pdfstyles.title}>{CV.fname + " " + CV.sname}</Text>
            {order.map((each, i) => {
              return (
                <>
                  {content[(each.id as number) * 2 - 2]}
                  {content[(each.id as number) * 2 - 1]}
                </>
              );
            })}
          </>
        </View>
      </Page>
    </Document>
  );
};

export default FormalCV;
